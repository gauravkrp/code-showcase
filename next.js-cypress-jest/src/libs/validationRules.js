export const requiredRule = inputName => ({
  name: 'required',
  message: `Please enter ${inputName}`,
  validator: value => !!value,
});

export const minLengthRule = (inputName, minLength) => ({
  name: 'minLength',
  message: `${inputName} should be of atleast ${minLength} characters`,
  validator: value => value.length > minLength - 1,
});
