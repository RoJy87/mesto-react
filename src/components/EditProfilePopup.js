import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoadingButton }) {
  const currentUser = useContext(CurrentUserContext);
  const [user, setUser] = useState(currentUser);
  const [buttonName, setButtonName] = useState("");

  useEffect(() => {
    isLoadingButton
      ? setButtonName("Сохранение...")
      : setButtonName("Сохранить");
  }, [isLoadingButton]);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser, onClose]);

  function handleChange(e) {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(user);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      btnName={buttonName}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="name"
          className="popup__input popup__input_value_name"
          type="text"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={user.name || ""}
          onChange={handleChange}
        />
        <span className="name-input-error popup__error"></span>
      </label>
      <label className="popup__form-field">
        <input
          id="about"
          className="popup__input popup__input_value_status"
          type="text"
          name="about"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={user.about || ""}
          onChange={handleChange}
        />
        <span className="status-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
