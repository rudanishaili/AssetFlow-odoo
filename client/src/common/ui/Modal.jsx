import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--spacing-md)'
      }}
      onClick={onClose}
    >
      <div 
        className="glass-card animate-fade-in" 
        style={{ 
          maxWidth: '500px', 
          width: '100%', 
          padding: 'var(--spacing-xl)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--text-muted)' }}
        >
          <X size={20} />
        </button>

        {title && <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-lg)' }} className="gradient-text">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
