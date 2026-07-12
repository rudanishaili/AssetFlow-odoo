import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import Button from '../ui/Button.jsx';

export const FormUpload = ({ label, onChange, error }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', width: '100%', marginBottom: 'var(--spacing-md)' }}>
      {label && <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</label>}
      
      <div 
        style={{
          border: error ? '2px dashed var(--danger)' : '2px dashed var(--surface-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-lg)',
          textAlign: 'center',
          background: 'var(--surface-hover)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)'
        }}
        onClick={handleUploadClick}
      >
        <Upload size={32} style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-sm)' }} />
        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 600 }}>Click to upload file</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Supported formats: JPG, PNG, GIF up to 5MB</p>
        {fileName && <p style={{ fontSize: '0.875rem', color: 'var(--primary)', marginTop: 'var(--spacing-sm)', fontWeight: 600 }}>{fileName}</p>}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }}
        accept="image/*"
      />
      {error && <span style={{ fontSize: '0.75rem', color: 'var(--danger)' }}>{error}</span>}
    </div>
  );
};

export default FormUpload;
