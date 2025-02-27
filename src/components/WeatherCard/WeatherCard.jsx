import React from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ temperature, condition, isDay }) {
  const matchedWeather = weatherOptions.find(
    (option) => option.condition === condition && option.day === isDay
  );

  return (
    <div
      className="weather-card"
      style={{
        backgroundColor: matchedWeather?.color || "#3498db",
        backgroundImage: `url(${matchedWeather?.url || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "right top",
      }}
    >
      <p className="weather-card__temp">{temperature}°F</p>
    </div>
  );
}

export default WeatherCard;
