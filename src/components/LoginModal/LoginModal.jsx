import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const LoginModal = ({ isOpen, onLogin, onClose, onSwitchToRegister }) => {
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

    onLogin(values)
      .then(() => onClose())
      .catch(() => setError("Invalid email or password."))
      .finally(() => setIsLoading(false));
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log In"
      buttonText={isLoading ? "Logging In..." : "Log In"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isLoading}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          id="login-email"
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
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          id="login-password"
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
      {error && <p className="modal__error">{error}</p>}
      <p className="modal__switch-text">
        or{" "}
        <button type="button" className="modal__switch-button" onClick={onSwitchToRegister}>
          Sign Up
        </button>
      </p>
    </ModalWithForm>
  );
};

export default LoginModal;