let container = document.querySelector('.container');
let editButton = container.querySelector('.profile__edit-button');
let closeButton = container.querySelector('.popup__close-button');
let saveButton = container.querySelector('.edit-form__save-button');

let popup = container.querySelector('.popup');

let profileName = container.querySelector('.profile__name');
let profileDescription = container.querySelector('.profile__description')

let form = container.querySelector('.edit-form');
let nameField = container.querySelector('.edit-form__field_type_name');
let descriptionField = container.querySelector('.edit-form__field_type_description');

let likeButtons = container.querySelectorAll('.places__like-button');

function openPopup() {
  popup.classList.add('popup_opened');
   nameField.value = profileName.textContent;
   descriptionField.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);
