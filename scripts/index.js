
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';

import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

import {profileEditButton, profileAddButton, formEditInfo, formCreatePlace, initialCards, validationConfig} from './constants.js'

const formCreatePlaceValidation = new FormValidator(validationConfig, formCreatePlace);
formCreatePlaceValidation.enableValidation();
const formEditInfoValidation = new FormValidator(validationConfig, formEditInfo);
formEditInfoValidation.enableValidation();

const renderedCards = new Section({
    items: initialCards,
    renderer: ({name, link}) => {
      renderedCards.addItem(createCard({name, link}, '.place-template'))
    }
  }, '.places__table'
);
renderedCards.renderItems();


const userInfo = new UserInfo('.profile__name', '.profile__description');

const popupInfoEdit = new PopupWithForm('.popup_type_info-edit', (values)=> {
  userInfo.setUserInfo(values);

}, ()=> {
  return userInfo.getUserInfo();

});

const popupCreateCard = new PopupWithForm('.popup_type_add-post', (values)=> {
  const newCard = new Section({
    items: [values],
    renderer: () => {
      newCard.addItem(createCard(values, '.place-template'));
    }
  }, '.places__table');
  newCard.renderItems();
})


popupInfoEdit.setEventListeners();
popupCreateCard.setEventListeners();

function createCard(cardData, templateSelector) {
  return new Card(cardData, templateSelector, openImagePopup).createPlace();
}

function openImagePopup(openedImageLink, imageTitle) {
  const openedImage = new PopupWithImage('.popup_type_image');
  openedImage.open(openedImageLink, imageTitle);
  openedImage.setEventListeners();

}

profileEditButton.addEventListener('click', () => {
  popupInfoEdit.open();
  formEditInfoValidation.clearErrors();
});

profileAddButton.addEventListener('click', () => {
  popupCreateCard.open();
  formCreatePlaceValidation.clearErrors();
  formCreatePlaceValidation.setButtonDisable();
});




