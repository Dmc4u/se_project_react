import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import CurrentUserContext from "../../utils/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  // Function to validate the avatar URL
  const isValidAvatarUrl = (url) => {
    try {
      new URL(url); // Checks if the URL is valid
      return true;
    } catch {
      return false;
    }
  };

  // Function to generate a placeholder with the first letter of the user's name
  const getAvatarPlaceholder = (name) => {
    const firstLetter = name?.charAt(0).toUpperCase() || "?";
    return (
      <div className="sidebar__avatar-placeholder">
        {firstLetter}
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        {isValidAvatarUrl(currentUser?.avatar) ? (
          <img
            src={currentUser.avatar}
            alt="Avatar" // Removed name from alt for privacy
            className="sidebar__avatar"
          />
        ) : (
          getAvatarPlaceholder(currentUser?.name)
        )}
        <button
          className="sidebar__edit-avatar-button"
          onClick={onEditProfile}
          aria-label="Edit Profile"
        ></button>
      </div>
      <p className="sidebar__username">{currentUser?.name || "User"}</p>
      <button className="sidebar__signout-button" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default SideBar;