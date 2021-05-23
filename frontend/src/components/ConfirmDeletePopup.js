import React from "react";
import PopupWithForm from "./PopupWithForm";

const ConfirmDeletePopup = ({ isOpen:{ isOpen, card },  onClose, onCardDelete }) => {
  const handleSubmit = e => {
    e.preventDefault()
    onCardDelete(card)
  }
  return (
    <PopupWithForm
      id="confirm"
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    ></PopupWithForm>
  );
};
export default ConfirmDeletePopup