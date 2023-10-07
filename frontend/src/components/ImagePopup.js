function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_openimage ${isOpen ? "popup_opened" : ""}`}>
      <figure className="popup__figure">
        <button
          type="button"
          className="popup__close popup__close_img"
          onClick={onClose}
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}
export default ImagePopup;
