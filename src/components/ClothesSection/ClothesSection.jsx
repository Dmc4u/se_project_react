import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../utils/CurrentUserContext";

function ClothesSection({ onCardClick, clothingItems, onAddClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Filter clothing items to show only those added by the current user
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button
          className="clothes-section__add-btn modal__button"
          onClick={onAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userClothingItems.length > 0 ? (
          userClothingItems.map((item) => (
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
    </div>
  );
}

export default ClothesSection;