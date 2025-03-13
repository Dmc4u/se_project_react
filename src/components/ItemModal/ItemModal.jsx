import React from "react";
import "./ItemModal.css";

function ItemModal({ isOpen, item, onClose, openConfirmationModal }) {
  if (!isOpen || !item) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content-image">
        <button className="modal__close modal__close_type_image" onClick={onClose}></button>
        <img src={item.imageUrl} alt={item.name} className="modal__image" />
        <div className="modal__info">
          <div>
            <h2 className="modal__title-image">{item.name}</h2>
            <h3 className="modal__weather">Weather: {item.weather}</h3>
          </div>
          <p className="modal__delete-text" onClick={() => openConfirmationModal(item)}> Delete Item</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
