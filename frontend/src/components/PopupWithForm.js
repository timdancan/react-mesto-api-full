const PopupWithForm = ({title, name, buttonText, children, isOpen, onClose, handleSubmit}) => {
 
  const handleClose = e => {
    if (e.target.classList.contains("popup")) onClose()
  }

  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_visiable' : false}`} onClick={handleClose}>
      <div className={`popup__content popup__content_${name}`}>
        <button className={`popup__close popup__close_${name} page-link`} type="button" onClick={onClose}></button>
        <h3 className={`popup__title popup__title_${name}`}>{title}</h3>
        <form
          className={`popup__form popup__form_${name}`}
          name={`popup-${name}`}
          noValidate
          onSubmit={handleSubmit}
        >
          {children}
          <button className={`popup__button popup__button_${name}`} type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
