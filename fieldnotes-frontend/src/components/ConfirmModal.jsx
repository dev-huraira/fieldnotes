import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#242423]/10 backdrop-blur-[2px]" 
        onClick={onClose}
      />
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-sm rounded-notebook border border-notebook-border bg-[#FAF8F4] p-6 shadow-notebook-hover animate-fade-in z-10">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-notebook-coral/10 text-notebook-coral">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-notebook-text font-sans">
              {title}
            </h3>
            <p className="mt-2 text-sm text-notebook-muted leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-notebook border border-notebook-border px-3.5 py-1.5 text-sm font-medium text-notebook-text bg-transparent hover:bg-notebook-cardHover"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-notebook bg-notebook-coral px-3.5 py-1.5 text-sm font-medium text-white hover:bg-notebook-coralHover focus:outline-none"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
