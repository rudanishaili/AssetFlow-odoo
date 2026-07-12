import React from 'react';
import Select from '../ui/Select.jsx';

function FormSelect({ register, name, ...props }) {
  return <Select {...props} name={name} {...(register ? register(name) : {})} />;
}

export default FormSelect;