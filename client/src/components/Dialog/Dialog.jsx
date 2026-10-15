import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Dialog({ role = 'dialog', labelledBy, describedBy, onClose, initialFocusRef, size, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;
    const appRoot = document.getElementById('root');

    appRoot?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';

    const target = initialFocusRef?.current || dialog.querySelector(FOCUSABLE) || dialog;
    target.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') {
        return;
      }
      const nodes = Array.from(dialog.querySelectorAll(FOCUSABLE));
      if (nodes.length === 0) {
        event.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      appRoot?.removeAttribute('inert');
      document.body.style.overflow = '';
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [onClose, initialFocusRef]);

  return createPortal(
    <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className={`dialog ${size === 'small' ? 'dialog--small' : ''}`}
        role={role}
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

Dialog.propTypes = {
  role: PropTypes.oneOf(['dialog', 'alertdialog']),
  labelledBy: PropTypes.string.isRequired,
  describedBy: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  initialFocusRef: PropTypes.shape({ current: PropTypes.any }),
  size: PropTypes.oneOf(['small']),
  children: PropTypes.node.isRequired,
};
