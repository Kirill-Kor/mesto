const container = document.querySelector('.container');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');

const formEditInfo = container.querySelector('.edit-form_type_info-edit');
const formCreatePlace = container.querySelector('.edit-form_type_add');

const initialCards = JSON.parse(placesData);

const validationConfig = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.edit-form__save-button',
  inactiveButtonClass: 'edit-form__save-button_inactive',
  errorFieldSelector: '.edit-form__field-error',
  inputErrorClass: 'edit-form__field_type_error'
}

export {profileEditButton, profileAddButton, formEditInfo, formCreatePlace, initialCards, validationConfig}
