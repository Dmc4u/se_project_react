

import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";




function ClothesSection({ onCardClick, clothingItems }) {

    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <p className="clothes-section__title">Your Items</p>
                <button className="clothes-section__add-btn">+ Add New</button>
            </div>
            <ul className="clothes-section__items">
        {clothingItems.map((item) => (
         <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        )) || (
          <p>No suitable clothing items found.</p>
        )}
      </ul>
        </div>
    )
}

export default ClothesSection;