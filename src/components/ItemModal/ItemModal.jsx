import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import CurrentUserContext from "../../utils/CurrentUserContext";

function ItemModal({ isOpen, item, onClose, openConfirmationModal }) {
  const currentUser = useContext(CurrentUserContext);

  if (!isOpen || !item) return null;

  // Check if the current user is the owner of the current item
  const isOwn = item.owner === currentUser?._id;

  // Determine the class name for the delete button
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  return (
    <Modal isOpen={isOpen} name="image" onClose={onClose}>
      <div className="modal__content-image">
        <button
          className="modal__close modal__close_type_image"
          onClick={onClose}
        ></button>
        <img src={item.imageUrl} alt={item.name} className="modal__image" />
        <div className="modal__info">
          <div>
            <h2 className="modal__title-image">{item.name}</h2>
            <h3 className="modal__weather">Weather: {item.weather}</h3>
          </div>
          {/* Conditionally show the delete button */}
          <button
            className={itemDeleteButtonClassName}
            onClick={() => openConfirmationModal(item)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;