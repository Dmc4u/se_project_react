import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../utils/CurrentUserContext";

function Header({ handleAddClick, weatherData, onLogin, onRegister, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const renderUserAvatar = () => {
    if (currentUser?.avatar) {
      return <img src={currentUser.avatar} alt="User Avatar" className="header__avatar" />;
    }
    const firstLetter = currentUser?.name?.charAt(0).toUpperCase() || "?";
    return <div className="header__avatar-placeholder">{firstLetter}</div>;
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={logo} alt="WTWR" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city || "Loading..."}
      </p>

      {/* Always show ToggleSwitch on desktop */}
      <ToggleSwitch className="header__toggle-switch" />

      {/* Desktop view */}
      <div className="header__desktop-actions">
        {isLoggedIn ? (
          <div className="header__desktop-user">
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn modal__button"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name || "User"}</p>
                {renderUserAvatar()}
              </div>
            </Link>
          </div>
        ) : (
          <div className="header__auth-buttons">
            <button onClick={onLogin} className="header__auth-btn">
              Log In
            </button>
            <button onClick={onRegister} className="header__auth-btn">
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu button */}
      <button onClick={toggleMobileMenu} className="header__menu-btn">
        {isMobileMenuOpened ? "Close" : "Menu"}
      </button>

      {/* Mobile menu */}
      {isMobileMenuOpened && (
        <nav className="nav-open">
          <div className="header__menu-content">
            <div className="header__menu-top">
              <p className="header__menu-date">
                {currentDate}, {weatherData.city || "Loading..."}
              </p>
              <ToggleSwitch className="header__toggle-switch" />
            </div>

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="header__menu-profile-link"
                  onClick={() => setIsMobileMenuOpened(false)}
                >
                  {renderUserAvatar()}
                  <p className="header__menu-username">{currentUser?.name || "User"}</p>
                </Link>

                <ul className="header__menu-list">
                  <li>
                    <button
                      onClick={() => {
                        handleAddClick();
                        setIsMobileMenuOpened(false);
                      }}
                      className="modal__button"
                    >
                      + Add Clothes
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <div className="header__menu-auth">
                <button onClick={onLogin} className="header__auth-btn">
                  Log In
                </button>
                <button onClick={onRegister} className="header__auth-btn">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
