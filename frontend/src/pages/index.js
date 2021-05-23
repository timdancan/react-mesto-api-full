import Card from '../scripts/components/Card.js'
import { FormValidator, validationConfig } from "../scripts/components/FormValidator.js"
import { listContainerElement, addSrcNode, popupAddForm, popupCloseForm, addNameNode, editButtonNode, profileTitleNode, profileSubtitleNode, popupInputTitleNode, popupInputSubtitleNode, profileAvatar, changeAvatarNode, addButtonNode, selectorObj, changeAvatarButton, popupChangeForm } from '../scripts/utils/constans.js'
import Section from '../scripts/components/Section.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import UserInfo from '../scripts/components/UserInfo.js'
import Api from '../scripts/components/Api.js'
import PopupWithConfirm from '../scripts/components/PopupWithConfirm'
import './index.css'


function handleLikeClick(id, isLiked, card) {
  if (isLiked) {
    api.dislikedCard(id)
      .then((data) => {
        card.setLikes(data.likes)
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.likedCard(id)
      .then((data) => {
        card.setLikes(data.likes)
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleTrashClick(id, card) {
  popupWithConfirm.setSubmitAction(() => handlePopupConfirm(id, card))
  popupWithConfirm.open()
}

function handlePopupConfirm(id, card) {
  console.log(id);
  api.deleteCard(id)
    .then(()=> {
      card.removeCard()
      popupWithConfirm.close()
    })
    .catch((err) => {
      console.log(err);
      popupWithConfirm.close();
    });
}

function openImageCard(name, link) {
  popupWithImage.open(name, link)
}


function createNewCard(item, id) {
  const card = new Card({data: item, openImageCard, handleTrashClick, handleLikeClick}, selectorObj.template, id)
  const newCard = card.generateCard()
  return newCard
}

function handlePopupAddCard () {
  popupWithFormAdd.renderSaving(true)
  const item = {
    name: addNameNode.value,
    link: addSrcNode.value
  }
  console.log(item);
  api.postNewCard(item)
    .then((data) => {
      console.log(data.owner._id)
      defaultCardList.setNewItem(createNewCard(data, data.owner._id))
      popupWithFormAdd.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      popupWithFormAdd.renderSaving(false)
    })
}

function handlePopupProfile () {
  popupWithFormEdit.renderSaving(true)
  api.saveUserChanges(popupInputTitleNode.value, popupInputSubtitleNode.value)
    .then((data) => {
      console.log(data)
      userInfo.setInfo(
        data.name,
        data.about,
        data.avatar
      )
      popupWithFormEdit.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      popupWithFormEdit.renderSaving(false)
    })
}

function handlePopupChangeAvatar() {
  popupChangeAvatar.renderSaving(true)
  const avatar = {
    link: changeAvatarNode.value
  }
  console.log(avatar)
  api.changedAvatar(avatar)
    .then((data) => {
      console.log(data);
      userInfo.setInfo(
        data.name,
        data.about,
        data.avatar
      )
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      popupChangeAvatar.renderSaving(false)
    })
}

changeAvatarButton.addEventListener('click', ()=> {
  changePopupValidation.clearErrors()
  popupChangeAvatar.open()
  changePopupValidation.setButtonState(popupChangeForm.checkValidity())
})

editButtonNode.addEventListener('click', ()=> {
  const data = userInfo.getInfo()
  popupInputTitleNode.value = data.name;
  popupInputSubtitleNode.value = data.description;
  editPopupValidation.clearErrors()
  popupWithFormEdit.open()
  editPopupValidation.setButtonState(popupCloseForm.checkValidity())
})

addButtonNode.addEventListener('click', ()=>{
    addPopupValidation.clearErrors()
    popupWithFormAdd.open()
    addPopupValidation.setButtonState(popupAddForm.checkValidity())
});


const editPopupValidation = new FormValidator (validationConfig, popupCloseForm)
editPopupValidation.enableValidation()

const addPopupValidation = new FormValidator (validationConfig, popupAddForm)
addPopupValidation.enableValidation()

const changePopupValidation = new FormValidator (validationConfig, popupChangeForm)
changePopupValidation.enableValidation()

const userInfo = new UserInfo(profileTitleNode, profileSubtitleNode, profileAvatar)

const popupWithImage = new PopupWithImage(selectorObj.popupImageSelector);
popupWithImage.setEventListeners()

const popupWithFormEdit = new PopupWithForm(selectorObj.popupProfileSelector, handlePopupProfile)
popupWithFormEdit.setEventListeners()

const popupWithFormAdd = new PopupWithForm(selectorObj.popupAddCardSelector, handlePopupAddCard)
popupWithFormAdd.setEventListeners()

const popupWithConfirm = new PopupWithConfirm(selectorObj.popupConfirmSelector);
popupWithConfirm.setEventListeners();

const api = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-20',
  headers:"424dcfe6-7281-4ce4-8ed0-0018c46e204a"
})

const popupChangeAvatar = new PopupWithForm(selectorObj.popupChangeSelector, handlePopupChangeAvatar)
popupChangeAvatar.setEventListeners()

const defaultCardList  = new Section({ 
  renderer: (item, id)=> {
    defaultCardList.setItem(createNewCard(item, id))
  } 
}, listContainerElement)

  Promise.all([
    api.getUserData(),
    api.getInitialCards()
  ])
  .then(([userData, cards]) => {
    userInfo.setInfo(
      userData.name,
      userData.about,
      userData.avatar
    )
    defaultCardList.renderItems(cards, userData._id)
  })
    .catch((err) => {
          console.log(err);
    });