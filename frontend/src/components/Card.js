import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleCardClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardDeleteButtonClassName = `${isOwn ? "elements__delete" : ""}`;
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;

  return (
    <div className="elements__blok">
      <img
        className="elements__img"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        />
      )}
      <div className="elements__title">
        <h2 className="elements__text">{card.name}</h2>
        <div className="elements__like-info">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
