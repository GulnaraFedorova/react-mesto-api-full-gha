import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = " ";
  }, [isOpen]);

  function handleSubmitAvatar(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current?.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitAvatar}
    >
      <input
        id="avatar"
        type="url"
        required=""
        placeholder="Ссылка на изображение"
        name="avatar"
        className="popup__form popup__form_type_edit-avatar"
        ref={avatarRef}
      />
      <span className="popup__input-error" id="error-avatar" />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
