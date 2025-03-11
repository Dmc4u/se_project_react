import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onDeleteItem }) {
  console.log("Item Link:", item.link); // Debugging: Ensure URL is correct

  return (
    <li className="cards__item">
      <h2 className="cards__item-title">{item.name}</h2>
      <img
        src={`${item.link}?timestamp=${new Date().getTime()}`} // 🛠 Force reload
        alt={item.name || "Clothing item"} // Prevent empty alt attributes
        className="cards__item-image"
        onClick={() => onCardClick(item)}
      />
      <button className="cards__delete-btn" onClick={() => onDeleteItem(item._id)}>
        Delete
      </button>
    </li>
  );
}

export default ItemCard;
