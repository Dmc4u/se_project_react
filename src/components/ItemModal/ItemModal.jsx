import React from "react";
import "./ItemModal.css";

function ItemModal({ item, onClose }) {
  return (
    <div className={`modal ${item ? "modal_opened" : ""}`}>
      <div className="modal__content-image">
        <button className="modal__close modal__close_type_image" onClick={onClose}>
        </button>
        <img src={item.link} alt={item.name} className="modal__image" />
        <div className="</div>">
        <h2 className="modal__title-image">{item.name}</h2>
        <h2 className="modal__weather">Weather: {item.weather}</h2>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
