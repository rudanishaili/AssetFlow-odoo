import React from 'react';
import Select from '../ui/Select';

export default function FormSelect({ label, options, error, ...props }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <Select label={label} options={options} error={error} {...props} />
    </div>
  );
}
