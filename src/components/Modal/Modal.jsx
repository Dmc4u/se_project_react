import { useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, name, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal modal_type_${name} modal_opened`} onClick={handleOverlayClick}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} />
        {children}
      </div>
    </div>
  );
}

export default Modal;
