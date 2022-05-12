const Yup = require('yup');

it('obj schema validated', async () => {
  const yupSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Please provide your first name!')
      .min(3, 'Is that a real name?')
      .max(35, 'Your name seems to be too long.'),
    lastName: Yup.string()
      .nullable()
      .notRequired()
      .min(2, 'Is that a real name?')
      .max(35, 'Your name seems to be too long.'),
    email: Yup.string().required('Please tell us your email.').email('Please enter a valid email.'),
  });
  const obj = {
    firstName: 'Jill',
    lastName: 'Gg',
    email: 'g@g.co',
  };

  await expect(yupSchema.isValid(obj)).resolves.toBe(true);
});
