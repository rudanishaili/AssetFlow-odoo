import React from 'react';
import Input from '../ui/Input';

export default function FormInput({ label, error, ...props }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <Input label={label} error={error} {...props} />
    </div>
  );
}
