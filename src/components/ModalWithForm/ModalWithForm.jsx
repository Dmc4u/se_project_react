import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ title, children, buttonText, activeModal, onClose, onSubmit }) {
  return (
    <div className={`modal ${activeModal ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
