import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal"; // Updated import
import "./RegisterModal.css"; // Ensure appropriate styles are included

const RegisterModal = ({ isOpen, onRegister, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatarUrl("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onRegister({ email, password, name, avatar: avatarUrl })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="register">
      <div className="modal__content-register">
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
              className="modal__link"
              onClick={() => {
                console.log("Redirect to Log In");
              }}
            >
              or Log In
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;