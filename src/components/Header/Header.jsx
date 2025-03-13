import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const currentDate = new Date();
  const options = { month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        {" "}
        <img src={logo} alt="WTWR" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {formattedDate}, {weatherData.city || "Loading..."}
      </p>

      <ToggleSwitch className="header__toggle-switch" />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <Link to="/profile" className="header__profile-link">
        <div className="header__user-container" >
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="User Avatar" className="header__avatar" />
        </div>
      </Link>

      <button onClick={toggleMobileMenu} className="header__menu-btn">
        {isMobileMenuOpened ? "Close" : "Menu"}
      </button>

      {isMobileMenuOpened && (
        <nav className="nav-open">
          <div className="header__menu-content">
            <p className="header__menu-date">
              {formattedDate}, {weatherData.city || "Loading..."}
            </p>
            <img
              src={avatar}
              alt="User Avatar"
              className="header__menu-avatar"
            />
            <ToggleSwitch className={"toggle-switch__center"} />
            <p className="header__menu-username">Terrence Tegegne</p>
            <ul className="header__menu-list">
              <li>
                <button
                  onClick={() => {
                    handleAddClick();
                    setIsMobileMenuOpened(false); // Close menu after clicking
                  }}
                >
                  + Add Clothes
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
