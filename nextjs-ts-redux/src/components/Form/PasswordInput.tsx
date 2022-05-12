import React, { useState, InputHTMLAttributes } from 'react';
import { ErrorMessage } from '@hookform/error-message';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ifLabel?: boolean;
  label: string;
  register: any;
  errors: any;
  name: string;
}

const PasswordInput = ({
  ifLabel,
  label,
  name,
  register,
  placeholder,
  errors,
  defaultValue,
  ...rest
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="formControl requiredField">
      <div className="form-group position-relative">
        {ifLabel && (
          <label htmlFor={name} className="formLabel">
            {label}
          </label>
        )}
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          placeholder={placeholder ? placeholder : label}
          className={'formInput' + (errors.password ? ' is-invalid' : '')}
          // ref={inputRef}
          defaultValue={defaultValue}
          {...register(name)}
          {...rest}
        />
        <span
          className="showHidePwd position-absolute"
          onClick={() => setShowPassword(!showPassword)}
        >
          {' '}
          {showPassword ? 'hide' : 'show'}
        </span>
      </div>
      <ErrorMessage className="field-error" errors={errors} as="span" name={name} />
    </div>
  );
};

export default PasswordInput;
