import React, { useState } from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function Profile({ onCardClick, onCardLike, clothingItems, onAddClick, onUpdateUser, onSignOut }) {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditProfileModalOpen(false);
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={handleEditProfileClick} onSignOut={onSignOut} />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          clothingItems={clothingItems}
          onAddClick={onAddClick}
        />
      </section>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={handleCloseModal}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
}

export default Profile;