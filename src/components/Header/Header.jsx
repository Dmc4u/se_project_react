import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import CurrentUserContext from "../../utils/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData, onLogin, onRegister, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  // Function to generate a placeholder with the first letter of the user's name
  const getAvatarPlaceholder = (name) => {
    const firstLetter = name?.charAt(0).toUpperCase() || "?";
    return (
      <div className="header__avatar-placeholder">
        {firstLetter}
      </div>
    );
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={logo} alt="WTWR" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city || "Loading..."}
      </p>

      <ToggleSwitch className="header__toggle-switch" />

      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn modal__button"
          >
            + Add Clothes
          </button>
          <div className="header__user-container">
            <p className="header__username">{currentUser?.name || "User"}</p>
            {getAvatarPlaceholder(currentUser?.name)}
          </div>
        </>
      ) : (
        <div className="header__auth-container">
          <button
            onClick={onLogin}
            type="button"
            className="header__auth-btn"
          >
            Log in
          </button>
          <button
            onClick={onRegister}
            type="button"
            className="header__auth-btn"
          >
            Sign up
          </button>
        </div>
      )}

      <button onClick={toggleMobileMenu} className="header__menu-btn">
        {isMobileMenuOpened ? "Close" : "Menu"}
      </button>

      {isMobileMenuOpened && (
        <nav className="nav-open">
          <div className="header__menu-content">
            <button
              className="modal__close_type_nav"
              onClick={() => setIsMobileMenuOpened(false)}
            ></button>
            {isLoggedIn ? (
              <>
                <div className="header__user">
                  <p className="header__menu-username">
                    {currentUser?.name || "User"}
                  </p>
                  {getAvatarPlaceholder(currentUser?.name)}
                </div>
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
              <ul className="header__menu-list">
                <li>
                  <button onClick={onLogin} className="header__auth-btn">
                    Log in
                  </button>
                </li>
                <li>
                  <button onClick={onRegister} className="header__auth-btn">
                    Sign up
                  </button>
                </li>
              </ul>
            )}
            <ToggleSwitch className="toggle-switch__center" />
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;