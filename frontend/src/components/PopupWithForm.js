function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? `popup_opened` : ""
      }`}
      onClick={props.onCloseClick}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <h2 className={`popup__header`}>{props.title}</h2>
        <form
          className="popup__fieldset"
          name={props.form}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__button" title="Сохранить">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
