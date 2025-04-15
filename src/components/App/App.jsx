import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteComfirmationModal/DeleteComfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData, API_KEY } from "../../utils/weatherApi";
import CurrentUserContext from "../../utils/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../utils/CurrentTemperatureUnitContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: { F: null, C: null },
    type: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getWeather("Hadera, Israel", API_KEY)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems().then(setClothingItems).catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
          // Only redirect to /profile if the user is visiting the root URL initially
          if (window.location.pathname === "/" && !isLoggedIn) {
            navigate("/profile");
          }
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, [navigate, isLoggedIn]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    return addItem({ name, imageUrl, weather })
      .then((addedItem) => {
        setClothingItems((prevItems) => [addedItem, ...prevItems]);
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleUpdateUser = (userData) => {
    updateUser(userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setActiveModal(null);
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleCardDelete = () => {
    if (cardToDelete) {
      handleDeleteItem(cardToDelete._id);
    }
  };

  const handleModalClose = () => {
    setActiveModal(null);
    setCardToDelete(null);
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    return signup({ email, password, name, avatar })
      .then(() => {
        navigate("/login");
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    return signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        checkToken(res.token)
          .then((data) => {
            setCurrentUser(data);
            navigate("/profile");
          })
          .catch(console.error);
        setActiveModal(null);
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      // Add a like
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
    } else {
      // Remove a like
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLogin={() => setActiveModal("login")}
              onRegister={() => setActiveModal("register")}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      onUpdateUser={handleUpdateUser}
                      onSignOut={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemSubmit}
              onClose={handleModalClose}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              item={selectedCard}
              onClose={handleModalClose}
              openConfirmationModal={openConfirmationModal}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "confirm-delete"}
              onConfirm={handleCardDelete}
              onCancel={handleModalClose}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onRegister={handleRegister}
              onClose={handleModalClose}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              onClose={handleModalClose}
            />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
