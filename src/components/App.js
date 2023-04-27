import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Spinner from "./Spinner";
import { api } from "./utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
  const [isSpinnerPopupOpen, setSpinnerPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoadingButton, setLoadingButton] = useState(false);

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

  function loadingSpinner(isLoading) {
    setSpinnerPopupOpen(isLoading);
  }

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

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(user) {
    setLoadingButton(true);
    api
      .setUserInfo(user)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingButton(false);
      });
  }

  function handleUpdateAvatar(user) {
    setLoadingButton(true);
    api
      .setUserAvatar(user)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingButton(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setLoadingButton(true);
    api
      .setItems(card)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingButton(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === newCard._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setDeletePlacePopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardDeleteSubmit(card) {
    setLoadingButton(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => {
          return cards.filter((c) => {
            const newCard = c._id !== card._id;
            return newCard;
          });
        });
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingButton(false);
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
            isLoadingButton={isLoadingButton}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoadingButton={isLoadingButton}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoadingButton={isLoadingButton}
          />
          <DeletePlacePopup
            card={deletedCard}
            isOpen={isDeletePlacePopupOpen}
            onClose={closeAllPopups}
            onDeletePlace={handleCardDeleteSubmit}
            isLoadingButton={isLoadingButton}
          />
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
