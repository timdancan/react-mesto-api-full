import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {

  const inputEl = useRef()

  const handleSubmit = e => {
    e.preventDefault();

    onUpdateAvatar(inputEl.current.value);
  } 


  return (
    <PopupWithForm
      id="change"
      title="Обновить аватар"
      name="change"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <label className="popup__label popup__label_change">
        <input
          type="url"
          className="popup__input popup__input_change"
          id="input-change"
          name="Url"
          placeholder="Ссылка на картинку"
          ref={inputEl}
          required
        />
        <span className="popup__error" id="input-change-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
