import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardLike,
  onCardDelete,
  onCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <button className="profile__edit-avatar" onClick={onEditAvatar}>
            <img
              src={currentUser?.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
          </button>
          <div className="profile__name">
            <div className="profile__title-add">
              <h1 className="profile__title">{currentUser?.name}</h1>
              <button
                type="button"
                className="profile__edit"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__text">{currentUser?.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add" onClick={onAddPlace} />
      </section>
      <section className="elements">
        <div className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
