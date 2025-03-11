import React from "react";
import "./ItemModal.css";

function ItemModal({ isOpen, item, onClose, onDeleteItem }) {
  if (!isOpen || !item) {
    return null;
  }

  const handleDelete = () => {
    onDeleteItem(item._id); // Call the delete function with the item's ID
    onClose(); // Close the modal after deletion
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content-image">
        <button className="modal__close modal__close_type_image" onClick={onClose}></button>
        <img src={item.link} alt={item.name} className="modal__image" />
        <h2 className="modal__title-image">{item.name}</h2>
        <h2 className="modal__weather">Weather: {item.weather}</h2>

        {/* Add Delete Button */}
        <button className="modal__delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
