import React from 'react';
import { Upload } from 'lucide-react';

export default function FormUpload({ 
  label, 
  error, 
  onFileSelect, 
  accept = 'image/*', 
  className = '' 
}) {
  const [dragActive, setDragActive] = React.useState(false);
  const [fileName, setFileName] = React.useState('');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '16px',
    fontFamily: 'var(--font-sans)',
  };

  const uploadAreaStyle = {
    padding: '24px',
    border: `2px dashed ${dragActive ? 'var(--brand-primary)' : 'var(--border-color)'}`,
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--bg-secondary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'var(--transition-all)',
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      if (onFileSelect) onFileSelect(file);
    }
  };

  const handleSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      if (onFileSelect) onFileSelect(file);
    }
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</span>}
      <label 
        style={uploadAreaStyle}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          accept={accept} 
          style={{ display: 'none' }} 
          onChange={handleSelect} 
        />
        <Upload size={32} style={{ color: 'var(--text-tertiary)', marginBottom: '8px' }} />
        <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
          {fileName ? fileName : 'Click to upload or drag files here'}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
          Supports images up to 5MB
        </span>
      </label>
      {error && <span style={{ fontSize: '0.75rem', color: 'var(--status-error)' }}>{error}</span>}
    </div>
  );
}
