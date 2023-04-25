import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    inputRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      btnName="Сохранить"
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
