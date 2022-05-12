import { DevTool } from '@hookform/devtools';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Form({ defaultValues, yupSchema, children, onSubmit }: any) {
  const methods = useForm({ defaultValues, resolver: yupResolver(yupSchema) });
  const { control, handleSubmit } = methods;

  return (
    <div className={`formContainer`}>
      <DevTool control={control} placement="top-right" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {React.Children.map(children, child => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: methods.register,
                  key: child.props.name,
                },
              })
            : child;
        })}
      </form>
    </div>
  );
}
