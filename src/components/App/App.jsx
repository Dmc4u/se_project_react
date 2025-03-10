import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import WeatherCard from "../WeatherCard/WeatherCard";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData, API_KEY } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: { F: null, C: null },
    type: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    const location = "Hadera, Israel"; // Default location
    getWeather(location, API_KEY)
      .then((data) => {
        console.log("Weather API Response:", data);
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    setClothingItems((prevItems) => [
      { name, link: imageUrl, weather },
      ...prevItems,
    ]);
    handleModalClose();
  };

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <WeatherCard 
            temperature={weatherData.temperature} 
            condition={weatherData.condition} 
            isDay={weatherData.isDay} 
          />

          <Routes>
            <Route path="/" element={<Main weatherData={weatherData} onCardClick={handleCardClick} clothingItems={clothingItems} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          <Footer />

          <AddItemModal isOpen={activeModal === "add-garment"} onAddItem={handleAddItemSubmit} onClose={handleModalClose} />
          <ItemModal isOpen={activeModal === "preview"} item={selectedCard} onClose={handleModalClose} />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;