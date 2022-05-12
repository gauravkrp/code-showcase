import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import ReactSelect from 'react-select';
import TagsInput from '../../components/TagsInput';

const Input = ({
  register,
  name,
  inputType,
  label,
  placeholder,
  errors,
  className,
  elementType = '',
  selectInput,
  selectOptions,
  control,
  requiredField,
  textAreaRows = 3,
  radioValues,
  setValue,
  containerClass,
  ...rest
}: any) => {
  const commonProps = {
    className: `formInput${className ? ` ${className}` : ''}`,
    id: `${name}-input`,
    placeholder: placeholder ? placeholder : label,
    ['aria-invalid']: errors.name ? 'true' : 'false',
    ...rest,
  };

  let inputElement = (
    <input {...register(name)} type={inputType ? inputType : 'text'} {...commonProps} />
  );

  if (elementType === 'textarea') {
    inputElement = <textarea {...register(name)} rows={textAreaRows} {...commonProps}></textarea>;
  }

  if (elementType === 'select' || selectInput == true) {
    if (!selectOptions)
      throw new Error('props selectOptions missing! Options for Select not defined!');
    inputElement = (
      <Controller
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ReactSelect
            options={selectOptions}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            inputRef={ref}
            className="basic-multi-select selectInput"
            classNamePrefix="react-select"
            id={`${name}-input`}
            instanceId={`rs-${name}`}
            {...rest}
          />
        )}
        control={control}
        name={name}
        rules={{ required: true }}
      />
    );
  }

  if (elementType === 'tagsInput') {
    if (!setValue) throw new Error('props setValue missing! setValue function not defined!');
    inputElement = (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TagsInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            inputRef={ref}
            errors={errors.tags}
            {...commonProps}
            returnTags={(tags: string[]) =>
              setValue(name, tags, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
          />
        )}
      />
    );
  }

  if (elementType === 'radio') {
    if (!radioValues)
      throw new Error('props radioValues missing! Options for radio input not defined!');
    inputElement = (
      <div className="formInput--group">
        {Object.keys(radioValues).map((key: any) => (
          <label key={key} htmlFor={name} className="formLabel--input">
            <input {...register(name)} type="radio" value={key} />
            {radioValues[key]}
          </label>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`formControl${requiredField ? ` requiredField` : ''}${
        containerClass ? ` ${containerClass}` : ''
      }`}
    >
      <label htmlFor={name} className="formLabel">
        {label}
      </label>
      {inputElement}
      <ErrorMessage className="field-error" errors={errors} as="span" name={name} />
    </div>
  );
};

export default Input;
