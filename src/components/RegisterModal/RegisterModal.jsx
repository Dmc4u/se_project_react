import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const RegisterModal = ({ isOpen, onRegister, onClose, onSwitchToLogin }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setError("");
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValid) {
      setError("Please fix the validation errors.");
      setIsLoading(false);
      return;
    }

    onRegister(values)
      .then(() => {
        onClose(); // Close the RegisterModal
        onSwitchToLogin(); // Immediately open the LoginModal
      })
      .catch(() => setError("An error occurred. Please try again."))
      .finally(() => setIsLoading(false));
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      buttonText={isLoading ? "Signing Up..." : "Sign Up"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isLoading}
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          id="register-email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          className="modal__input"
          placeholder="Email"
          required
          disabled={isLoading}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          id="register-password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          className="modal__input"
          placeholder="Password"
          required
          disabled={isLoading}
        />
        {errors.password && <span className="modal__error">{errors.password}</span>}
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          type="text"
          id="register-name"
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
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          id="register-avatar"
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
      <p className="modal__switch-text">
        or{" "}
        <button type="button" className="modal__switch-button" onClick={onSwitchToLogin}>
          Log In
        </button>
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;