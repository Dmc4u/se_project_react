import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, onCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <div className="main">
      <p className="cards__text">
        Today in {weatherData.city}, it is {weatherData.temperature[currentTemperatureUnit]}°
        {currentTemperatureUnit} / You may want to wear:
      </p>
      <ul className="cards__list">
        {clothingItems.filter((card) => card.weather === weatherData.type).map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        )) || (
          <p>No suitable clothing items found.</p>
        )}
      </ul>
    </div>
  );
}

export default Main;