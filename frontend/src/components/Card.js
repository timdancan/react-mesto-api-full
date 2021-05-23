import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useContext } from 'react'

const Card = ({name, link, likes, handleCardClick, card, onCardLike, onConfirmeDelete}) => {
  const currentUser = useContext(CurrentUserContext)
  const onCardClick = () => {
    handleCardClick(card)
  }
  const handleLikeClick = () => {
    onCardLike(card)
  }

  const handleTrashClick = () => {
    onConfirmeDelete(card)
  }
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? null : 'element__trash_hidden'} page-link`
  ); 
  const cardLikeButtonClassName = (
    `element__button ${isLiked ? 'element__button_active' : null} page-link`
  )

  return (
    <article className="element">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleTrashClick}></button>
      <div className="element__img" style={{backgroundImage: `url(${link})`}} role="img" aria-label={name} onClick={onCardClick}></div>
      <div className="element__items">
        <h3 className="element__title">{name}</h3>
        <div className="element__container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <span className="element__counter">{likes.length}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;
