import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date();
  const options = { month: "long", day: "numeric" }; 
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <header className="header">
      <img src={logo} alt="WTWR" className="header__logo" />
      <p className="header__date-and-location">
        {formattedDate}, {weatherData.city || "Loading..."}
      </p>
      <button onClick={handleAddClick} type="button" className="header__add-clothes-btn">
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="User Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
