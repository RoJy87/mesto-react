import React, { useState, useEffect } from 'react';
import { api } from './utils/Api';
import Card from './Card';

function Main({ onLoadingSpinner, ...props }) {

  const [profileInfo, setProfileInfo] = useState({})
  const [cards, setCards] = useState([])

  useEffect(() => {
    onLoadingSpinner(true)
    Promise.all([api.pullUserInfo(), api.getItems()])
      .then(([userData, cardData]) => {
        setProfileInfo({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id
        })
        setCards(cardData)
      })
      .catch((err) => console.log(err))
      .finally(() => { onLoadingSpinner(false) })
  }, [])

  return (
    <main className="main">

      <section className="profile">
        <button
          onClick={props.onEditAvatar}
          aria-label="Редактировать аватар"
          className="profile__avatar-btn button"
          type="button">
          <img
            src={profileInfo.avatar}
            alt="Аватар пользователя"
            className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name">{profileInfo.name}</h1>
            <p className="profile__description">{profileInfo.about}</p>
          </div>
          <button
            onClick={props.onEditProfile}
            aria-label="Редактировать профиль"
            type="button"
            className="profile__edit-btn button"></button>
        </div>
        <button
          onClick={props.onAddPlace}
          aria-label="Добавить место"
          type="button"
          className="profile__add-btn button"></button>
      </section>

      <section aria-label="Интересные места для посещения">
        <ul className="places">
          {cards.map((card) => {
            return (
              <Card card={card} key={card._id} onCardClick={() => props.onCardClick(card)} />
            )
          })}
        </ul>
      </section>

    </main>
  )
}

export default Main;