import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      btnName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="name-input"
          className="popup__input popup__input_value_name"
          type="text"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeName}
        />
        <span className="name-input-error popup__error"></span>
      </label>
      <label className="popup__form-field">
        <input
          id="status-input"
          className="popup__input popup__input_value_status"
          type="text"
          name="description"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChangeDescription}
        />
        <span className="status-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
