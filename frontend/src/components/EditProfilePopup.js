import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { useEffect, useState, useContext } from "react";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  function handleSubmitProfile(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameUser(event) {
    setName(event.target.value);
  }
  function handleDescriptionUser(event) {
    setDescription(event.target.value);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitProfile}
    >
      <input
        id="name"
        type="text"
        required=""
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        name="name"
        className="popup__form popup__form_type_name"
        value={name || ""}
        onChange={handleNameUser}
      />
      <span className="popup__input-error" id="error-name" />
      <input
        value={description || ""}
        onChange={handleDescriptionUser}
        id="info"
        type="text"
        required=""
        placeholder="Информация"
        minLength={2}
        maxLength={200}
        name="about"
        className="popup__form popup__form_type_information"
      />
      <span className="popup__input-error" id="error-info" />
    </PopupWithForm>
  );
}
export default EditProfilePopup;
