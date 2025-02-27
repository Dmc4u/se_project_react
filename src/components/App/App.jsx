import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import WeatherCard from "../WeatherCard/WeatherCard"; // ✅ Ensure it's only imported once
import { getWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: null,
    type: "",
    condition: "",
    isDay: true,
  });

  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newGarment, setNewGarment] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // Fetch Weather Data
  const fetchWeather = async (latitude, longitude) => {
    try {
      const weather = await getWeatherData(latitude, longitude);
      if (weather) {
        setWeatherData(weather);
      }
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User location:", latitude, longitude);
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation access denied. Using default location.");
          fetchWeather(32.4374, 34.9164); // Default: Hadera, Israel
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      fetchWeather(32.4374, 34.9164);
    }
  }, []);

  // Toggle Modals
  const toggleModal = (modalType = null, card = null) => {
    setActiveModal(modalType);
    setSelectedCard(card);
    setNewGarment({ name: "", imageUrl: "", weather: "" }); // Reset form when opening modal
  };

  // Handle Input Change for Garment Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGarment((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Garment Added:", newGarment);
    toggleModal();
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={() => toggleModal("add-garment")} weatherData={weatherData} />

        {/* ✅ Render WeatherCard once inside App */}
        <WeatherCard
          temperature={weatherData.temperature}
          condition={weatherData.condition}
          isDay={weatherData.isDay}
        />

        <Main weatherData={weatherData} onCardClick={(item) => toggleModal("view-item", item)} />
        <Footer />

        {/* Add Garment Modal */}
        {activeModal === "add-garment" && (
          <ModalWithForm
            title="New Garment"
            buttonText="Add Garment"
            activeModal={activeModal}
            onClose={() => toggleModal()}
            onSubmit={handleSubmit}
          >
            <label htmlFor="name" className="modal__label">
              Name{" "}
              <input
                type="text"
                className="modal__input"
                id="name"
                name="name"
                value={newGarment.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
            </label>
            <label htmlFor="imageUrl" className="modal__label">
              Image{" "}
              <input
                type="url"
                className="modal__input"
                id="imageUrl"
                name="imageUrl"
                value={newGarment.imageUrl}
                onChange={handleInputChange}
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
                  checked={newGarment.weather === "hot"}
                  onChange={handleInputChange}
                  required
                />{" "}
                Hot
              </label>
              <label htmlFor="warm" className="modal__input modal__input_type_radio">
                <input
                  id="warm"
                  type="radio"
                  name="weather"
                  className="modal__radio-input"
                  value="warm"
                  checked={newGarment.weather === "warm"}
                  onChange={handleInputChange}
                  required
                />{" "}
                Warm
              </label>
              <label htmlFor="cold" className="modal__input modal__input_type_radio">
                <input
                  id="cold"
                  type="radio"
                  name="weather"
                  className="modal__radio-input"
                  value="cold"
                  checked={newGarment.weather === "cold"}
                  onChange={handleInputChange}
                  required
                />{" "}
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
        )}

        {/* View Item Modal */}
        {activeModal === "view-item" && selectedCard && (
          <ItemModal item={selectedCard} onClose={() => toggleModal()} />
        )}
      </div>
    </div>
  );
}

export default App;
