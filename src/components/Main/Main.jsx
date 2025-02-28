import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, onCardClick }) {
  const filteredItems = defaultClothingItems.filter((item) => item.weather === weatherData.type);

  return (
    <main className="main">

      <section className="cards">
        <p className="cards__text">
          Today in {weatherData.city}, it is {weatherData.temperature}°F / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
