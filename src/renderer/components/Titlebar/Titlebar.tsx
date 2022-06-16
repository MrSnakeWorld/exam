import { useCallback } from 'react';
import { CgClose } from 'react-icons/cg';
import { HiMinus } from 'react-icons/hi';
import './Titlebar.css';

const Titlebar = () => {
  const handleClose = useCallback(async () => {
    window.api.closeWindow();
  }, []);

  const handleHide = useCallback(async () => {
    window.api.hideWindow();
  }, []);

  return (
    <>
      <div className="titlebar-buttons">
        <button
          onClick={handleHide}
          type="button"
          className="titlebar-button titlebar-minus"
        >
          <HiMinus />
        </button>

        <button
          onClick={handleClose}
          type="button"
          className="titlebar-button titlebar-cross"
        >
          <CgClose />
        </button>
      </div>
      <div className="titlebar" />
    </>
  );
};

export default Titlebar;
