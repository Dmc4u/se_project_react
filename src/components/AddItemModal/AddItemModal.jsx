import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset the form when the modal is opened
  useEffect(() => {
    if (isOpen) {
      resetForm();
      setError("");
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) {
      setError("Please fix the validation errors.");
      return;
    }

    setError(""); // Clear error state if validation passes
    setIsLoading(true); // Start loading

    onAddItem({ name: values.name, imageUrl: values.imageUrl, weather: values.weather })
      .then(() => {
        onClose(); // Close the modal after successful save
      })
      .catch(() => {
        setError("An error occurred while saving. Please try again."); // Handle save failure
      })
      .finally(() => setIsLoading(false)); // Stop loading after request
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="New Garment"
      buttonText={isLoading ? "Saving..." : "Add Garment"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isLoading}
    >
      <label htmlFor="add-item-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="add-item-name"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          placeholder="Name"
          required
          disabled={isLoading}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="add-item-imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="add-item-imageUrl"
          name="imageUrl"
          value={values.imageUrl || ""}
          onChange={handleChange}
          placeholder="Image URL"
          required
          disabled={isLoading}
        />
        {errors.imageUrl && <span className="modal__error">{errors.imageUrl}</span>}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__label-title">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label key={type} className="modal__input modal__input_type_radio">
            <input
              type="radio"
              name="weather"
              id={`add-item-weather-${type}`}
              className="modal__radio-input"
              value={type}
              checked={values.weather === type}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
        {errors.weather && <span className="modal__error">{errors.weather}</span>}
      </fieldset>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
};

export default AddItemModal;