import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import Spinner from './Spinner';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isSpinnerPopupOpen, setSpinnerPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function loadingSpinner(isLoading) {
    setSpinnerPopupOpen(isLoading)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  return (
    <div className="App">

      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onLoadingSpinner={loadingSpinner}
      />
      <Footer />
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        btnName="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children=
        {<>
          <label className="popup__form-field">
            <input
              id="name-input"
              className="popup__input popup__input_value_name"
              type="text"
              name="name"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40" />
            <span className="name-input-error popup__error"></span>
          </label>
          <label className="popup__form-field">
            <input
              id="status-input"
              className="popup__input popup__input_value_status"
              type="text"
              name="about"
              placeholder="О себе"
              required
              minLength="2"
              maxLength="200" />
            <span className="status-input-error popup__error"></span>
          </label>
        </>}
      />
      <PopupWithForm
        name="add-place"
        title="Новое место"
        btnName="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children=
        {<>
          <label className="popup__form-field">
            <input
              id="place-name-input"
              className="popup__input popup__input_value_place-name"
              type="text"
              name="name"
              placeholder="Название места"
              required
              minLength="2"
              maxLength="30" />
            <span className="place-name-input-error popup__error"></span>
          </label>
          <label className="popup__form-field">
            <input
              id="url-input"
              className="popup__input popup__input_value_url"
              type="url"
              name="link"
              placeholder="Ссылка на картинку" required />
            <span className="url-input-error popup__error"></span>
          </label>
        </>}
      />
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        btnName="Сохранить"
        onClose={closeAllPopups}
        children=
        {<>
          <label className="popup__form-field">
            <input
              id="avatar-input"
              className="popup__input popup__input_value_avatar"
              type="url"
              name="avatar"
              placeholder="Ссылка на картинку" required />
            <span className="avatar-input-error popup__error"></span>
          </label>
        </>}
      />
      <PopupWithForm
        name="delete-place"
        title="Вы уверены?"
        btnName="Да"
      />
      <PopupWithImage
        name="image"
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <Spinner
        name="spinner"
        isOpen={isSpinnerPopupOpen}
      />

    </div>
  );
}

export default App;
