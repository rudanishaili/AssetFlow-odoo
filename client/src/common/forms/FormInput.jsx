import React from 'react';
import Input from '../ui/Input.jsx';

function FormInput({ register, name, ...props }) {
  return <Input {...props} name={name} {...(register ? register(name) : {})} />;
}

export default FormInput;