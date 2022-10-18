import './index.css';

import {initialCards} from '../utils/places.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {profileEditButton, profileAddButton, formEditInfo, formCreatePlace, validationConfig} from '../utils/constants.js';

const formCreatePlaceValidation = new FormValidator(validationConfig, formCreatePlace);
formCreatePlaceValidation.enableValidation();
const formEditInfoValidation = new FormValidator(validationConfig, formEditInfo);
formEditInfoValidation.enableValidation();

const renderedCards = new Section(
     ({name, link}) => {
      renderedCards.addItem(createCard({name, link}, '.place-template'))
    },
  '.places__table',
);
renderedCards.renderItems(initialCards);

const userInfo = new UserInfo('.profile__name', '.profile__description');

const popupInfoEdit = new PopupWithForm('.popup_type_info-edit', (values)=> {
  userInfo.setUserInfo(values);

}, ()=> {
  return userInfo.getUserInfo();

});

const popupCreateCard = new PopupWithForm('.popup_type_add-post', (values)=> {
  renderedCards.addItem(createCard(values, '.place-template'));
})

const openedImage = new PopupWithImage('.popup_type_image');

popupInfoEdit.setEventListeners();
popupCreateCard.setEventListeners();
openedImage.setEventListeners();

function createCard(cardData, templateSelector) {
  return new Card(cardData, templateSelector, openImagePopup).createPlace();
}

function openImagePopup(openedImageLink, imageTitle) {
  openedImage.open(openedImageLink, imageTitle);
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




