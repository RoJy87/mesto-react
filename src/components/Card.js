function Card(props) {

  return (
    <li className="places__items">
      <article className="place">
        <button
          onClick={props.onCardClick}
          type="button"
          className="place__img-btn button">
          <img
            src={props.card.link}
            alt={props.card.name}
            className="place__photo" />
        </button>
        <div className="place__wrapper-name">
          <h2 className="place__name">{props.card.name}</h2>
          <div className="place__like-wrapper">
            <button
              aria-label="Отметить мне нравиться"
              type="button"
              className="place__like-btn button"></button>
            <span className="place__like-count">{props.card.likes.length}</span>
          </div>
        </div>
      </article>
      <button
        aria-label="Удалить карточку"
        type="button"
        className="place__delete-btn button">
      </button>
    </li>
  )
}

export default Card;