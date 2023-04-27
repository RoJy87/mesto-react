import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoadingButton }) {
  const inputRef = React.useRef("");
  const [buttonName, setButtonName] = useState("");

  useEffect(() => {
    inputRef.current.value = "";
  }, [onClose]);

  useEffect(() => {
    isLoadingButton
      ? setButtonName("Сохранение...")
      : setButtonName("Сохранить");
  }, [isLoadingButton]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      btnName={buttonName}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="avatar-input"
          className="popup__input popup__input_value_avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          ref={inputRef}
        />
        <span className="avatar-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
