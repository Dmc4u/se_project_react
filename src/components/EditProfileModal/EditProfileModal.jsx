import React, { useState, useContext, useEffect } from "react";
import Modal from "../Modal/Modal";
import CurrentUserContext from "../../utils/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="edit-profile">
      <div className="edit-profile__content">
      <button
          className="modal__close modal__close_type_edit-profile"
          onClick={onClose}
        ></button>
        <form className="edit-profile__form" onSubmit={handleSubmit}>
          <h2 className="edit-profile__title">Edit Profile</h2>
          <label className="edit-profile__label">
            Name
            <input
              type="text"
              className="edit-profile__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </label>
          <label className="edit-profile__label">
            Avatar URL
            <input
              type="url"
              className="edit-profile__input"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Enter avatar URL"
              required
            />
          </label>
          <button type="submit" className="edit-profile__button">
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default EditProfileModal;