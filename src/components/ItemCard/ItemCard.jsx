import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../utils/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `cards__like-button ${
    isLiked ? "cards__like-button_active" : ""
  }`;

  return (
    <li className="cards__item">
      <div className="card__description">
        <h2 className="cards__item-title">{item.name}</h2>
        <div className="card__actions">
          <button
            className={itemLikeButtonClassName}
            onClick={() => onCardLike({ id: item._id, isLiked })}
            aria-label="Like"
          />
        </div>
      </div>
      <img
        src={item.imageUrl}
        alt={item.name || "Clothing item"}
        className="cards__item-image"
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}

export default ItemCard;