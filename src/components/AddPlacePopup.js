import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoadingButton }) {
  const [card, setCard] = useState({});
  const [buttonName, setButtonName] = useState("");

  useEffect(() => {
    isLoadingButton ? setButtonName("Сохранение...") : setButtonName("Создать");
  }, [isLoadingButton]);

  useEffect(() => {
    setCard({});
  }, [onClose]);

  function handleChange(e) {
    setCard((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(card);
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      btnName={buttonName}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="name"
          className="popup__input popup__input_value_place-name"
          type="text"
          name="name"
          placeholder="Название места"
          required
          minLength="2"
          maxLength="30"
          value={card.name || ""}
          onChange={handleChange}
        />
        <span className="place-name-input-error popup__error"></span>
      </label>
      <label className="popup__form-field">
        <input
          id="link"
          className="popup__input popup__input_value_url"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={card.link || ""}
          onChange={handleChange}
        />
        <span className="url-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
