import React, { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../utils/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const renderUserAvatar = () => {
    if (currentUser?.avatar) {
      return <img src={currentUser.avatar} alt="User Avatar" className="sidebar__avatar" />;
    }

    const firstLetter = currentUser?.name?.charAt(0).toUpperCase() || "?";
    return <div className="sidebar__avatar-placeholder">{firstLetter}</div>;
  };

  return (
    <div className="sidebar">
      <div className="sidebar__info">
      {renderUserAvatar()}
      <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <button className="sidebar__edit-btn" onClick={onEditProfile}>
        
        Change profile data
      </button>
      <button className="sidebar__logout-btn" onClick={onSignOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;