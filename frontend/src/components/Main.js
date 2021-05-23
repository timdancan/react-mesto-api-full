import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, handleCardLike, handleCardDelete, onConfirmeDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentCards = useContext(CardContext);

  return (
    <main className="main">
      <section className="profile content content_place_profile">
        <div className="profile__content">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
            <button
              className="profile__avatar-button"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button page-link"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button page-link"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements content content_place_elements">
        {currentCards.map((item) => {
          return (
            <Card
              key={item._id}
              {...item}
              card={item}
              handleCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onConfirmeDelete={onConfirmeDelete}
              handleConfirmeDelete={onConfirmeDelete}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
