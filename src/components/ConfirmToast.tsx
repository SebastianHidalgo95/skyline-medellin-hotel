import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ConfirmToastProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmToast: React.FC<ConfirmToastProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="p-4">
      <p className="mb-4">{message}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => { onConfirm()}}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faCheck} className="mr-2" />
          Yes
        </button>
        <button
          onClick={() => { onCancel() }}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmToast;