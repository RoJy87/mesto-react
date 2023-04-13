function PopupWithImage({ name, card, onClose }) {

  return (
    <div className={`popup popup_type_${name} ${card && "popup_opened"}`}>
      <div className="popup__container popup__container_style_reset">
        <button
          aria-label="Закрыть"
          className="popup__close-btn button"
          type="button"
          onClick={onClose}
        >
        </button>
        <figure className="popup__img-block">
          <img
            src={card && card.link}
            alt={card && card.name}
            className="popup__photo" />
          <figcaption className="popup__caption">{card && card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default PopupWithImage;