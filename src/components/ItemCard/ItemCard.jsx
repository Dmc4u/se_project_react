import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../utils/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `cards__like-button ${
    isLiked ? "cards__like-button_active" : ""
  }`;

  const handleLike = () => {
    if (onCardLike) {
      onCardLike({ id: item._id, isLiked });
    }
  };

  return (
    <li className="cards__item">
      <div className="card__description">
        <h2 className="cards__item-title">{item.name}</h2>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            aria-label="Like"
          />
        )}
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