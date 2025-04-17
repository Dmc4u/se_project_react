import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import CurrentUserContext from "../../utils/CurrentUserContext";

function ItemModal({ isOpen, item, onClose, openConfirmationModal, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  if (!isOpen || !item) return null;

  // Check if the current user is the owner of the current item
  const isOwn = item.owner === currentUser?._id;

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
          {/* Show Delete Button Only if User is Logged In and Owns the Item */}
          {isLoggedIn && isOwn && (
            <button
              className="modal__delete-button"
              onClick={() => openConfirmationModal(item)}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;