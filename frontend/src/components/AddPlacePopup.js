import {useState, useEffect} from "react";
import PopupWithForm from './PopupWithForm'

const AddPlacePopup = ({ onClose, isOpen, onAddPlace }) => {

  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onAddPlace({
      name: name,
      link: link
    })
  }

  useEffect(() => {
    setName('');
    setLink('');
}, [isOpen]);

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleLinkChange = e => {
    setLink(e.target.value)
  }

  return (
    <PopupWithForm
      id="add"
      title="Новое место"
      name="add"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <label className="popup__label popup__label_add">
        <input
          type="text"
          className="popup__input popup__input_add_name"
          id="input-name"
          name="Name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="popup__error" id="input-name-error"></span>
      </label>
      <label className="popup__label popup__label_add">
        <input
          type="url"
          className="popup__input popup__input_add_src"
          id="input-url"
          name="Url"
          value={link}
          placeholder="Ссылка на картинку"
          onChange={handleLinkChange}
          required
        />
        <span className="popup__error" id="input-url-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
