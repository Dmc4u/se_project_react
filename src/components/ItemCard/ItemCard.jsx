import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick}) {

  return (
    <li className="cards__item">
      <h2 className="cards__item-title">{item.name}</h2>
      <img
        src={`${item.imageUrl}?timestamp=${new Date().getTime()}`} // 🛠 Force reload
        alt={item.name || "Clothing item"} // Prevent empty alt attributes
        className="cards__item-image"
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}

export default ItemCard;


