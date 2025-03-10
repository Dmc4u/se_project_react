import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  // Declare state for each input field
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  // Reset the input field state to empty strings when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  // Create onChange handlers
  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    // Empty the input fields
    setName("");
    setImageUrl("");
    setWeather("");
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      activeModal={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          required
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
          onChange={handleImageUrlChange}
          placeholder="Image URL"
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__label-title">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__input modal__input_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__input modal__input_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
            required
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__input modal__input_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
            required
          />
          Cold
        </label>
      </fieldset> 
    </ModalWithForm>
  );
};

export default AddItemModal;