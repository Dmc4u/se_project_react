import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { isValidUrl, isNonEmptyString } from "../../utils/validation"; // Import validation functions

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  // Declare state for each input field
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Add loading state
  const [error, setError] = useState(""); // ✅ Add error state for validation

  // Reset the input fields when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
      setError(""); // Reset error state
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!isNonEmptyString(name)) {
      setError("Name must be between 2 and 30 characters.");
      return;
    }
    if (!isValidUrl(imageUrl)) {
      setError("Please enter a valid image URL.");
      return;
    }
    if (!weather) {
      setError("Please select a weather type.");
      return;
    }

    setError(""); // Clear error state if validation passes
    setIsLoading(true); // ✅ Start loading

    onAddItem({ name, imageUrl, weather })
      .then(() => {
        onClose(); // ✅ Close the modal after successful save
      })
      .catch(() => {
        setError("An error occurred while saving. Please try again."); // Handle save failure
      })
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

      {/* Display validation error messages */}
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
};

export default AddItemModal;