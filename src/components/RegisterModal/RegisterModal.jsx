import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { isValidEmail, isValidUrl, isNonEmptyString } from "../../utils/validation"; // Import validation logic

const RegisterModal = ({ isOpen, onRegister, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Add error state

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatarUrl("");
      setError(""); // Reset errors
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs before submission
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isValidUrl(avatarUrl)) {
      setError("Please enter a valid avatar URL.");
      return;
    }
    if (!isNonEmptyString(name)) {
      setError("Name must be between 2 and 30 characters.");
      return;
    }

    setIsLoading(true);
    onRegister({ email, password, name, avatar: avatarUrl })
      .finally(() => setIsLoading(false))
      .catch(() => setError("Registration failed. Please try again.")); // Handle registration failure
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="register">
      <div className="modal__content-register">
        <button
          className="modal__close modal__close_type_register"
          onClick={onClose}
        ></button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Sign Up</h2>
          <label htmlFor="email" className="modal__label">
            Email*
            <input
              type="email"
              className="modal__input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={isLoading}
            />
          </label>
          {error && <p className="modal__error">{error}</p>} {/* Show error */}
          <label htmlFor="password" className="modal__label">
            Password*
            <input
              type="password"
              className="modal__input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isLoading}
            />
          </label>
          <label htmlFor="name" className="modal__label">
            Name*
            <input
              type="text"
              className="modal__input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              disabled={isLoading}
            />
          </label>
          <label htmlFor="avatarUrl" className="modal__label">
            Avatar URL*
            <input
              type="url"
              className="modal__input"
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="Avatar URL"
              required
              disabled={isLoading}
            />
          </label>
          <div className="modal__footer-register">
            <button
              type="submit"
              className="modal__button modal__button_primary"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            <button
              type="button"
              className="modal__button modal__button-secondary"
              onClick={() => navigate("/login")}
            >
              Or Log In
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;