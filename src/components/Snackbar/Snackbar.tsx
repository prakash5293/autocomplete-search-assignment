import React, { useEffect, useState } from 'react';
import './Snackbar.css';

interface Props {
  message: string | null;
  onClose: () => void;
  type: 'success' | 'error' | '';
}

const Snackbar: React.FC<Props> = ({ message, onClose, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      // Timer to close the Snackbar after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      // Clear the timer if the component is unmounted or if the message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = () => {
    setVisible(false);
    onClose(); // Inform the parent component that the Snackbar has been closed
  };

  const snackbarClass = type === 'success' ? 'snackbar-container success' : 'snackbar-container error';

  return (
    <>
      {
        !visible || !message ? null :
          <div className={snackbarClass}>
            <span>{message}</span>
            <button role='button' onClick={handleClose}>Close</button>
          </div>
      }
    </>
  );
};

export default Snackbar;
