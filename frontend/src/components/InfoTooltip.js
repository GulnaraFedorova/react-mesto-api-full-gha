import React from "react";
import { useEffect } from "react";
import success from "../images/OK.jpg";
import fail from "../images/NOOK.jpg";

function InfoTooltip({ isOpen, onClose, isSucceeded }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleESC(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [isOpen, onClose]);

  return (
    <div className={`popup ${isOpen ? `popup_opened` : ""}`} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" type="button" onClick={onClose} />
        <img
          className="popup__authimg"
          src={isSucceeded ? success : fail}
          alt={isSucceeded ? "Успешно" : "Ошибка"}
        />
        <p className="popup__authheader">
          {isSucceeded
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
