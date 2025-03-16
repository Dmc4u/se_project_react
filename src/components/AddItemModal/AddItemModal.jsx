import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  // Declare state for each input field
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Add loading state

  // Reset the input fields when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Start loading
    onAddItem({ name, imageUrl, weather })
      .finally(() => setIsLoading(false)); // ✅ Stop loading after request
  };

  return (
    <ModalWithForm
      isOpen={isOpen} // ✅ Ensure this prop is passed
      title="New Garment"
      buttonText={isLoading ? "Saving..." : "Add Garment"} // ✅ Show loading text
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isLoading} // ✅ Disable button while loading
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          disabled={isLoading} // ✅ Disable input while loading
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          required
          disabled={isLoading} // ✅ Disable input while loading
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__label-title">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label key={type} className="modal__input modal__input_type_radio">
            <input
              type="radio"
              name="weather"
              className="modal__radio-input"
              value={type}
              checked={weather === type}
              onChange={(e) => setWeather(e.target.value)}
              required
              disabled={isLoading} // ✅ Disable input while loading
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
