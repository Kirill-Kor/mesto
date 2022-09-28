const container = document.querySelector('.container');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');

const popupEditInfo = container.querySelector('.popup_type_info-edit');
const popupCreatePlace = container.querySelector('.popup_type_add-post');
const popupOpenImage = container.querySelector('.popup_type_image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const imageCaption =  popupOpenImage.querySelector('.popup__caption');

const profileName = container.querySelector('.profile__name');
const profileDescription = container.querySelector('.profile__description');

const formEditInfo = container.querySelector('.edit-form_type_info-edit');

const nameField = container.querySelector('.edit-form__field_type_name');
const descriptionField = container.querySelector('.edit-form__field_type_description');

const formCreatePlace = container.querySelector('.edit-form_type_add');

const placesTable = container.querySelector('.places__table');

const placeNameField = container.querySelector('.edit-form__field_type_place-name');
const placeLinkField = container.querySelector('.edit-form__field_type_place-link');

const popupCloseButtons = container.querySelectorAll('.popup__close-button');

const initialCards = JSON.parse(placesData);
const validationConfig = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.edit-form__save-button',
  inactiveButtonClass: 'edit-form__save-button_inactive',
  errorFieldSelector: '.edit-form__field-error',
  inputErrorClass: 'edit-form__field_type_error'
}
import {Card} from './Card.js';
import {FormValidator} from "./FormValidator.js";

initialCards.forEach((card) => {
  renderPlace(createCard(card, '.place-template').createPlace(), placesTable);
});

const formCreatePlaceValidation = new FormValidator(validationConfig, formCreatePlace);
formCreatePlaceValidation.enableValidation();
const formEditInfoValidation = new FormValidator(validationConfig, formEditInfo);
formEditInfoValidation.enableValidation();

function submitProfileForm () {
  saveUserInfo();
  closePopup(popupEditInfo);
}

function submitCreatePlaceForm () {

  renderPlace(createCard(getNewPlaceObject(placeNameField.value, placeLinkField.value),'.place-template').createPlace(), placesTable);
  closePopup(popupCreatePlace);
}

function getNewPlaceObject(name, link) {
  return {"name": name, "link": link};
}

function createCard(cardData, templateSelector) {
  return new Card(cardData, templateSelector, openImagePopup);
}

function renderPlace(place, container) {
  container.prepend(place);
}

function openPopup(currentPopup) {
  currentPopup.classList.add('popup_opened');
  setPopupClosingListeners(currentPopup);
}

function openImagePopup(openedImage, imageTitle) {
  openPopup(popupOpenImage);
  popupImage.src = openedImage.src;
  popupImage.alt = openedImage.alt;
  imageCaption.textContent = imageTitle;
}

function setPopupClosingListeners(popup) {
  popup.addEventListener('mousedown', handleOutsideClick);
  document.addEventListener('keyup', handleEscClick);
}

function handleOutsideClick(evt) {
  if(evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function handleEscClick(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscClick);
  currentPopup.removeEventListener('mousedown', handleOutsideClick);
}

function fillFormEditInfoFields() {
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;
}

function saveUserInfo() {
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
}

profileEditButton.addEventListener('click', () => {
  fillFormEditInfoFields();
  openPopup(popupEditInfo);
  formEditInfoValidation.clearErrors();
});

profileAddButton.addEventListener('click', () => {
  placeNameField.value = "";
  placeLinkField.value = "";
  openPopup(popupCreatePlace);
  formCreatePlaceValidation.clearErrors();
  formCreatePlaceValidation.setButtonDisable();
});

formEditInfo.addEventListener('submit', submitProfileForm);
formCreatePlace.addEventListener('submit', submitCreatePlaceForm);
popupCloseButtons.forEach(button =>
  button.addEventListener('click', () => closePopup(button.closest('.popup'))));
