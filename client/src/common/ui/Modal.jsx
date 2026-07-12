import React from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer, 
  size = 'md' 
}) {
  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  };

  const sizes = {
    sm: '400px',
    md: '600px',
    lg: '800px',
  };

  const modalStyle = {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    width: '100%',
    maxWidth: sizes[size] || sizes.md,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--card-shadow)',
    animation: 'modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    maxHeight: '90vh',
  };

  const headerStyle = {
    padding: '16px 24px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  };

  const closeButtonStyle = {
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: 'var(--radius-sm)',
    transition: 'var(--transition-all)',
  };

  const bodyStyle = {
    padding: '24px',
    overflowY: 'auto',
    color: 'var(--text-secondary)',
  };

  const footerStyle = {
    padding: '16px 24px',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  };

  return ReactDOM.createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <button style={closeButtonStyle} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div style={bodyStyle}>{children}</div>
        {footer !== null && (
          <div style={footerStyle}>
            {footer || (
              <>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={onClose}>Confirm</Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
