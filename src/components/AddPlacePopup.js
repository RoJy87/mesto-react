import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      btnName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="place-name-input"
          className="popup__input popup__input_value_place-name"
          type="text"
          name="name"
          placeholder="Название места"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleChangeName}
        />
        <span className="place-name-input-error popup__error"></span>
      </label>
      <label className="popup__form-field">
        <input
          id="url-input"
          className="popup__input popup__input_value_url"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span className="url-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
