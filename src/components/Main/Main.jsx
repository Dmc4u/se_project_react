import React, { useContext } from "react";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard"; 
import CurrentTemperatureUnitContext from "../../utils/CurrentTemperatureUnitContext";

function Main({ weatherData, onCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = clothingItems.filter(
    (card) => card.weather === weatherData.type
  );

  return (
    <main className="main">
      <WeatherCard 
        temperature={weatherData.temperature} 
        condition={weatherData.condition} 
        isDay={weatherData.isDay} 
      />
      <p className="cards__text">
        Today in {weatherData.city}, it is{" "}
        {weatherData.temperature[currentTemperatureUnit]}°{currentTemperatureUnit} / You may want to wear:
      </p>
      <ul className="cards__list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike} // Pass handleCardLike to ItemCard
            />
          ))
        ) : (
          <p>No suitable clothing items found.</p>
        )}
      </ul>
    </main>
  );
}

export default Main;