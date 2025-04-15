import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { isValidEmail } from "../../utils/validation"; 

const LoginModal = ({ isOpen, onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Add error state

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError(""); // Clear errors when modal opens
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email before submission
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    onLogin({ email, password })
      .finally(() => setIsLoading(false))
      .catch(() => setError("Login failed. Please try again.")); // Handle login failure
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="login">
      <div className="modal__content-login">
        <button
          className="modal__close modal__close_type_login"
          onClick={onClose}
        ></button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2 className="modal__title">Log In</h2>
          <label htmlFor="email" className="modal__label">
            Email
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
            Password
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
          <div className="modal__footer-register">
            <button
              type="submit"
              className="modal__button modal__button_primary"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            <button
              className="modal__button modal__button-secondary"
              type="button"
              onClick={() => navigate("/register")}
            >
              Or Sign Up
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;