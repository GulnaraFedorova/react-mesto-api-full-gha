import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [isOpen]);

  function handleSubmitCards(event) {
    event.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitCards}
    >
      <input
        id="text"
        type="text"
        required
        placeholder="Название"
        minLength={2}
        maxLength={30}
        name="nameImg"
        className="popup__form popup__form_card_name"
        ref={nameRef}
      />
      <span className="popup__input-error" id="error-text" />
      <input
        id="url"
        type="url"
        required
        placeholder="Ссылка на картинку"
        name="linkImg"
        className="popup__form popup__form_card_image"
        ref={linkRef || ""}
      />
      <span className="popup__input-error" id="error-url" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;