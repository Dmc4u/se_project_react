import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal"; // Updated import
import "./LoginModal.css"; // Ensure appropriate styles are included

const LoginModal = ({ isOpen, onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onLogin({ email, password })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="login">
      <div className="modal__content-login">
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
          <div className="modal__footer">
            <button
              type="submit"
              className="modal__button modal__button_primary"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            <button
              type="button"
              className="modal__link"
              onClick={() => {
                console.log("Redirect to Sign Up");
              }}
            >
              or Sign Up
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;