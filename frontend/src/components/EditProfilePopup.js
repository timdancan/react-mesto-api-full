import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState('')
  const [description , setDescription ] = useState('')
  const currentUser = useContext(CurrentUserContext);

  const handleNameChange = e => {
    setName(e.target.value)
  }
  const handleDescriptionChange = e => {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      id="edit"
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      handleSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="text"
          className="popup__input popup__input_place_title"
          id="input-title"
          name="Name"
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          value={name || ''}
          required
        />
        <span className="popup__error" id="input-title-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          className="popup__input popup__input_place_subtitle"
          id="input-subtitle"
          name="Profession"
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange}
          required
        />
        <span className="popup__error" id="input-subtitle-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
