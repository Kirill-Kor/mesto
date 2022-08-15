let container = document.querySelector('.container');
let editButton = container.querySelector('.profile__edit-button');
const addButton = container.querySelector('.profile__add-button');

let saveButton = container.querySelector('.edit-form__save-button');

const popup = container.querySelector('.popup');
let editPopup = container.querySelector('.popup_type_info-edit');
const addPopup = container.querySelector('.popup_type_add-post');

let profileName = container.querySelector('.profile__name');
let profileDescription = container.querySelector('.profile__description')

let form = container.querySelector('.edit-form');
let nameField = container.querySelector('.edit-form__field_type_name');
let descriptionField = container.querySelector('.edit-form__field_type_description');

let likeButtons = container.querySelectorAll('.places__like-button');



function openPopup(currentPopup) {
  currentPopup.classList.add('popup_opened');
  const closeButton = currentPopup.querySelector('.popup__close-button').addEventListener
  ('click', () => closePopup(currentPopup));

  if (currentPopup.classList.value.includes('info-edit')) {
   infoSave();
  }
}

function infoSave() {
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;

}

function closePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
  closePopup(evt.target.parentElement.parentElement);
}

editButton.addEventListener('click', () => openPopup(editPopup));
addButton.addEventListener('click', () => openPopup(addPopup));
//closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);
