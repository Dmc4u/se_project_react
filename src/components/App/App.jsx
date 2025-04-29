import React, { useState, useEffect } from "react";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../utils/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../utils/CurrentTemperatureUnitContext";
import { getWeather, filterWeatherData, API_KEY } from "../../utils/weatherApi";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to track loading state
  const [currentUser, setCurrentUser] = useState(null);
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
  const navigate = useNavigate();

  useEffect(() => {
    getWeather("Hadera, Israel", API_KEY)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
     getItems()
       .then(setClothingItems)
       .catch(console.error);
    }
    }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        })
        .finally(() => setIsLoading(false)); // Set isLoading to false in both success and failure cases
    } else {
      setIsLoading(false); // No token, set isLoading to false
    }
  }, []);

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
    const token = localStorage.getItem("jwt");
    if (!token) return Promise.reject("Unauthorized");

    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    return updateUser({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch(console.error);
  };

  const handleAddClick = () => setActiveModal("add-garment");
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

  const handleRegister = ({ name, avatar, email, password }) => {
    return signup({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .then(() => handleModalClose())
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    return signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token).then((data) => {
          setCurrentUser(data);
          handleModalClose(); // ✅ close modal before navigating
          navigate("/profile");
        });
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

  const onSwitchToLogin = () => setActiveModal("login");
  const onSwitchToRegister = () => setActiveModal("register");

  if (isLoading) {
    return <div className="loading">Loading...</div>; // Render a loading indicator while checking authentication
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            onLogin={onSwitchToLogin}
            onRegister={onSwitchToRegister}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onAddClick={handleAddClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    onAddClick={handleAddClick}
                    onSignOut={handleLogout}
                    onUpdateUser={handleUpdateUser}
                    onCardClick={handleCardClick}
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
          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegister}
            onClose={handleModalClose}
            onSwitchToLogin={onSwitchToLogin}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onClose={handleModalClose}
            onSwitchToRegister={onSwitchToRegister}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            item={selectedCard}
            onClose={handleModalClose}
            openConfirmationModal={openConfirmationModal}
            isLoggedIn={isLoggedIn}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            onConfirm={handleCardDelete}
            onCancel={handleModalClose}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;