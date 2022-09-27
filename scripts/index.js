const container = document.querySelector('.container');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');

const popupEditInfo = container.querySelector('.popup_type_info-edit');
const popupCreatePlace = container.querySelector('.popup_type_add-post');
const popupOpenImage = container.querySelector('.popup_type_image');

const profileName = container.querySelector('.profile__name');
const profileDescription = container.querySelector('.profile__description');

const formEditInfo = container.querySelector('.edit-form_type_info-edit');

const nameField = container.querySelector('.edit-form__field_type_name');
const descriptionField = container.querySelector('.edit-form__field_type_description');

const formCreatePlace = container.querySelector('.edit-form_type_add');

const placeTemplate = container.querySelector('.place-template').content;
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
  inputErrorClass: 'edit-form__field_type_error'
}

class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector).content
      .querySelector('.places__place')
      .cloneNode(true);
    return placeElement;
  }

  createPlace() {
    this._element = this._getTemplate();

    const imageSelector = this._element.querySelector('.places__image');
    imageSelector.src = this._link;
    imageSelector.alt = "Фото";

    this._element.querySelector('.places__title').textContent = this._title;
    this._addEventListeners();
    return this._element;
  }

  _addEventListeners() {
    const likeButton = this._element.querySelector('.places__like-button');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('places__like-button_active');
    })

    const deleteButton = this._element.querySelector('.places__delete-button');
    deleteButton.addEventListener('click', () => {
      this._element.remove();
    })

    const openedImage = this._element.querySelector('.places__image');
    openedImage.addEventListener('click', () => {
      openPopup(popupOpenImage);
      const popupImage = container.querySelector('.popup__image');
      popupImage.src = openedImage.src;
      popupImage.alt = openedImage.alt;

      const imageCaption = container.querySelector('.popup__caption');
      imageCaption.textContent = this._title;
    })

  }
}

initialCards.forEach((item) => {
  renderPlace(new Card(item, '.place-template').createPlace(), placesTable);
});

enableValidation(validationConfig);

function submitProfileForm () {
  saveInfo();
  closePopup(popupEditInfo);
}

function submitCreatePlaceForm () {

  renderPlace(new Card(getNewPlaceObject(placeNameField.value, placeLinkField.value),'.place-template').createPlace(), placesTable);
  closePopup(popupCreatePlace);
}

function getNewPlaceObject(name, link) {
  return {"name": name, "link": link};

}

function renderPlace(place, container) {
  container.prepend(place);
}

function openPopup(currentPopup) {
  currentPopup.classList.add('popup_opened');
  setPopupClosingListeners(currentPopup);

}

function setPopupClosingListeners(popup) {
  popup.addEventListener('mousedown', handleOutsideClick);
  document.addEventListener('keyup', handleEscClick);
}

function handleOutsideClick(evt) {
  if(evt.target === evt.currentTarget) {
    popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function handleEscClick(evt) {
  if (evt.key === 'Escape') {
    popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function clearErrors(popup) {
  const errors = Array.from(popup.querySelectorAll('.edit-form__field-error'));
  const fields = Array.from(popup.querySelectorAll('.edit-form__field'));

  fields.forEach((field, index) => {
    hideInputError(field, errors[index]);
  })
  setButtonActive(validationConfig, popup);
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

function saveInfo() {
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
}

profileEditButton.addEventListener('click', () => {
  fillFormEditInfoFields();
  openPopup(popupEditInfo);
  clearErrors(popupEditInfo);
});

profileAddButton.addEventListener('click', () => {
  placeNameField.value = "";
  placeLinkField.value = "";
  openPopup(popupCreatePlace);
  clearErrors(popupCreatePlace);
  setButtonDisable(validationConfig, popupCreatePlace);

});

formEditInfo.addEventListener('submit', submitProfileForm);
formCreatePlace.addEventListener('submit', submitCreatePlaceForm);
popupCloseButtons.forEach(button =>
  button.addEventListener('click', () => closePopup(button.closest('.popup'))));

