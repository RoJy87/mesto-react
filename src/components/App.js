import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Spinner from "./Spinner";
import { api } from "./utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isSpinnerPopupOpen, setSpinnerPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadingSpinner(true);
    Promise.all([api.getUserInfo(), api.getItems()])
      .then(([userData, cardData]) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id,
        });
        setCards(cardData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        loadingSpinner(false);
      });
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((cards) =>
        cards.map((c) => (c._id === newCard._id ? newCard : c))
      );
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => {
        return cards.filter((c) => {
          const newCard = c._id !== card._id;
          return newCard;
        });
      });
    });
  }

  function loadingSpinner(isLoading) {
    setSpinnerPopupOpen(isLoading);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(user) {
    api.setUserInfo(user).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(user) {
    api.setUserAvatar(user).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit(card) {
    api.setItems(card).then((card) => {
      setCards([card, ...cards]);
      closeAllPopups();
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="app">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onLoadingSpinner={loadingSpinner}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm name="delete-place" title="Вы уверены?" btnName="Да" />
          <ImagePopup
            name="image"
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <Spinner name="spinner" isOpen={isSpinnerPopupOpen} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
