import { useState, useEffect } from 'react';
import axios from 'axios';
import withLayout from '../components/Layout';
import CustomSelect from '../components/Form/CustomSelect';
import { requiredRule, minLengthRule } from '../libs/validationRules';
import Head from 'next/head';

const usersUrl = `https://jsonplaceholder.typicode.com/users`;
const postsUrl = `https://jsonplaceholder.typicode.com/posts`;

// validation schema for form validation
const validationSchema = {
  userId: [
    {
      name: 'required',
      message: 'Please select an user',
      validator: value => !!value,
    },
  ],
  title: [requiredRule('title'), minLengthRule('title', 3)],
  body: [requiredRule('body'), minLengthRule('body', 10)],
};

const IndexPage = () => {
  // managing state for form, loading and errors
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [options, setOptions] = useState(null);
  const [apiErr, setAPIErr] = useState(null);
  const [formMsg, setFormMsg] = useState({
    type: 'error',
    message: null,
  });

  const [formValues, setFormValues] = useState({
    userId: null,
    title: '',
    body: '',
  });
  const [errors, setErrors] = useState({
    userId: '',
    title: '',
    body: '',
  });

  // fetch users list on mounting
  useEffect(() => {
    axios
      .get(usersUrl)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length) {
          setOptions(
            res.data.map(item => ({
              value: item.id,
              label: item.name,
            })),
          );
        } else {
          setAPIErr('No user found!');
        }
      })
      .catch(err => setAPIErr(err.message || 'Failed to load users list'))
      .finally(() => setLoading(false));
  }, []);

  // hanlde the inputs
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // handle the selection component onChange
  const onSelectChange = selected => {
    setFormValues({
      ...formValues,
      userId: selected.value,
    });
    setErrors({
      ...errors,
      userId: '',
    });
  };

  // on input focus remove the input error
  const onInputFocus = event => {
    const { name } = event.target;
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // form validation
  const validateForm = () => {
    let valid = true;
    for (const key in formValues) {
      validationSchema[key].find(rule => {
        if (!rule.validator(formValues[key])) {
          valid = false;
          setErrors(prevState => ({
            ...prevState,
            [key]: rule.message,
          }));
          return true;
        }
      });
    }
    return valid;
  };

  // submit handler
  const handleSubmit = event => {
    event.preventDefault();
    setFormMsg({ type: 'error', message: null });
    const isValid = validateForm();
    if (isValid) submitForm(formValues);
    else return;
  };

  // form submission and response handling
  const submitForm = data => {
    setSubmitting(true);
    axios
      .post(postsUrl, data)
      .then(res => {
        if (res.status === 201) {
          setFormMsg({ type: 'success', message: 'Form submitted successfully!' });
        } else setFormMsg({ type: 'error', message: 'Some error occured! Please try later.' });
      })
      .catch(err =>
        setFormMsg({
          type: 'error',
          message: err.message || 'Unable to submit form. Please retry.',
        }),
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <Head>
        <title>My Project</title>
      </Head>
      <main className="page-container">
        <h1 className="page-heading">My Project Heading</h1>
        <form className="form" onSubmit={handleSubmit} name="user-form">
          <div className="form-control">
            {isLoading ? (
              <p>Loading users list...</p>
            ) : options && options.length > 0 ? (
              <CustomSelect
                label="Please select an user"
                options={options}
                error={errors.userId}
                onChange={onSelectChange}
              />
            ) : (
              <p>{apiErr}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="title" >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Provide Title"
              value={formValues.title}
              onChange={handleInputChange}
              onFocus={onInputFocus}
              aria-required="true"
            />
            {errors.title && <p data-cy="title-error" aria-invalid="true" className="error">{errors.title}</p>}
          </div>

          <div className="form-control">
            <label htmlFor="body">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              rows={2}
              placeholder="Provide Body"
              value={formValues.body}
              onChange={handleInputChange}
              onFocus={onInputFocus}              
              aria-required="true"
            ></textarea>
            {errors.body && <p data-cy="body-error" aria-invalid="true" className="error">{errors.body}</p>}
          </div>

          <div className="btn-wrapper">
            <button type="submit" className="btn submit-btn" disabled={isSubmitting}>
              Submit
            </button>
          </div>

          {formMsg.message && <p className={`form-msg msg-${formMsg.type}`}>{formMsg.message}</p>}
        </form>
      </main>
    </>
  );
};

export default withLayout(IndexPage);

// Since it is a next.js project, we can also fetch users list on server side and make it a SSR page.
/*
export async function getServerSideProps(context) {
  
  const response = await axios.get(usersUrl).catch(err => {
    return { props: { data: null, error: err.message || 'failed' } };
  });

  if (response?.data) {
    return {
      props: {
        users: response?.data,
        error: null,
      },
    };
  }

  return {
    props: {},
  }
}
*/
