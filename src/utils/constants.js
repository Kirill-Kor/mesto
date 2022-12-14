const container = document.querySelector('.container');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileAddButton = container.querySelector('.profile__add-button');
const profileAvatarButton = container.querySelector('.profile__avatar-container');

const profileAvatar = container.querySelector('.profile__avatar');

const formEditInfo = container.querySelector('.edit-form_type_info-edit');
const formCreatePlace = container.querySelector('.edit-form_type_add');
const formChangeAvatar = container.querySelector('.edit-form_type_avatar');



const validationConfig = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.save-button',
  inactiveButtonClass: 'save-button_inactive',
  errorFieldSelector: '.edit-form__field-error',
  inputErrorClass: 'edit-form__field_type_error'
}

export {profileEditButton, profileAddButton, profileAvatarButton, formEditInfo, formCreatePlace, formChangeAvatar, validationConfig, profileAvatar}
