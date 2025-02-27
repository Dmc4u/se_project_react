import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="cards__item">
      <h2 className="cards__item-title">{item.name}</h2>
      <img
        src={item.link}
        alt={item.name}
        className="cards__item-image"
        onClick={() => onCardClick(item)} // ✅ Fix: Call function properly
      />
    </li>
  );
}

export default ItemCard;
