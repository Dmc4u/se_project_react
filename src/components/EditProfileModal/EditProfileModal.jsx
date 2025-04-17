import React, { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../utils/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  useEffect(() => {
    if (isOpen) {
      resetForm(
        {
          name: currentUser?.name || "",
          avatar: currentUser?.avatar || "",
        },
        {},
        true
      );
      setError("");
    }
  }, [isOpen, currentUser, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    onUpdateUser({ name: values.name, avatar: values.avatar })
      .then(() => onClose())
      .catch(() => setError("An error occurred. Please try again."))
      .finally(() => setIsLoading(false));
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || isLoading} // Disable button if form is invalid or loading
    >
      <label htmlFor="edit-profile-name" className="modal__label">
        Name *
        <input
          type="text"
          id="edit-profile-name"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          className="modal__input"
          placeholder="Name"
          required
          disabled={isLoading}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="edit-profile-avatar" className="modal__label">
        Avatar *
        <input
          type="url"
          id="edit-profile-avatar"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          className="modal__input"
          placeholder="Avatar URL"
          required
          disabled={isLoading}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default EditProfileModal;