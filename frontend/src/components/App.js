import { useState, useCallback, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import { api } from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isRemovalPopupOpen, setIsRemovalPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setInitialCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isTooltipStatus, setIsTooltipStatus] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const jwt = localStorage.getItem("jwt");
      Promise.all([api.getUser(jwt), api.getCards(jwt)])
        .then(([data, cards]) => {
          setCurrentUser(data);
          setInitialCards(cards);
        })
        .catch((error) =>
          console.error(`Ошибка при загрузке данных с сервера - ${error}`),
        );
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsRemovalPopupOpen(false);
    setSelectedCard({});
    setIsTooltipOpen(false);
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    const jwt = localStorage.getItem("jwt");
    api
      .toggleLike(card._id, isLiked, jwt)
      .then((newCard) => {
        setInitialCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((error) =>
        console.error(` Ошибка при добавлении или снятии лайка ${error}`),
      );
  }
  function handleCardDelete(card) {
    const jwt = localStorage.getItem("jwt");
    api
      .deleteCard(card._id, jwt)
      .then(() => {
        setInitialCards((state) => state.filter((res) => res._id !== card._id));
        setIsRemovalPopupOpen(true)
      })
      .catch((error) => console.error(`Ошибка в удалении карточки ${error}`));
  }
  function handleUpdateUser(data) {
    const jwt = localStorage.getItem("jwt");
    api
      .updateProfileInfo(data, jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) =>
        console.error(`Ошибка редактирования профиля ${error}`),
      );
  }

  function handleUpdateAvatar(data) {
    const jwt = localStorage.getItem("jwt");
    api
      .updateAvatar(data, jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка смены аватара ${error}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    const jwt = localStorage.getItem("jwt");
    api
      .addCard(name, link, jwt)
      .then((res) => {
        setInitialCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) =>
        console.error(`Ошибка при попытке создать карточку ${error}`),
      );
  }

  const chekToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .tokenValidation(jwt)
        .then((data) => {
          if (!data) {
            return;
          }
          setUserData(data.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((error) => {
          setIsLoggedIn(false);
          console.error(`Ошибка верификации токена - ${error}`);
        });
    }
  };

  useEffect(() => {
    chekToken();
  }, []);

  if (isLoggedIn === null) {
    return (
      <div className="loading">
        {" "}
        <p className="loading__text">Loading</p>
      </div>
    );
  }

  const handleRegister = (email, password) => {
    auth
      .userRegistration(email, password)
      .then(() => {
        setIsTooltipOpen(false);
        setIsTooltipStatus(true);
        navigate("/sign-in");
      })
      .catch((error) => {
        setIsTooltipOpen(true);
        setIsTooltipStatus(false);
        console.error(`Ошибка при регистрации ${error}`);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .userAuthorization(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setUserData(email);
          navigate("/");
        }
      })
      .catch((error) => {
        setIsTooltipOpen(true);
        setIsTooltipStatus(false);
        console.error(`Ошибка при авторизации, ${error}`);
      });
  };

  function signtOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setUserData("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header userEmail={userData} signtOut={signtOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
           <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="removal"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isRemovalPopupOpen}
          onClose={closeAllPopups}
          onClicDelete={handleCardDelete}
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        ></ImagePopup>

        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          status={isTooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
