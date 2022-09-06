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

const initialCards = JSON.parse(places);


  initialCards.forEach((item) => {
    renderPlace(createPlace(item.name, item.link), placesTable);
  });

  const forms = Array.from(container.querySelectorAll('.edit-form'));

  //Включаем валидацию и сохраняем начальные состояния кнопок
  const initialButtonStates = forms.map((form) => {
    return enableValidation({
      formSelector: form,
      inputSelector: form.querySelectorAll('.edit-form__field'),
      submitButtonSelector: form.querySelector('.edit-form__save-button'),
      inactiveButtonClass: 'edit-form__save-button_inactive',
      inputErrorClass: 'edit-form__field_type_error'
    })
  })

  console.log(initialButtonStates);


function submitProfileForm (evt) {
  evt.preventDefault();
  saveInfo();
  closePopup(popupEditInfo);
}

function submitCreatePlaceForm (evt) {
  evt.preventDefault();
  renderPlace(createPlace(placeNameField.value, placeLinkField.value), placesTable);
  const createButton = popupCreatePlace.querySelector('.edit-form__save-button');
  createButton.disabled = true;
  createButton.classList.add('edit-form__save-button_inactive');
  closePopup(popupCreatePlace);
}

function createPlace(placeName, placeLink) {
  const place = placeTemplate.querySelector('.places__place').cloneNode(true);
  const placesImageSelector = place.querySelector('.places__image');
  placesImageSelector.src = placeLink;
  placesImageSelector.alt = "Фото";
  place.querySelector('.places__title').textContent = placeName;


  const likeButton = place.querySelector('.places__like-button');
    likeButton.addEventListener('click', function(evt) {
      evt.target.classList.toggle('places__like-button_active');
    })

  const deleteButton = place.querySelector('.places__delete-button');
    deleteButton.addEventListener('click', function(evt) {
      evt.target.closest('.places__place').remove();
    })

  const openedImage = place.querySelector('.places__image');
    openedImage.addEventListener('click', function(evt) {
      openPopup(popupOpenImage);
      const popupImage = container.querySelector('.popup__image');
      popupImage.src = evt.target.src;
      popupImage.alt = evt.target.alt;

      const imageCaption = container.querySelector('.popup__caption');
      imageCaption.textContent = placeName;
    })

  return place;
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
  const errors = popup.querySelectorAll('.edit-form__field-error');
  const fields = popup.querySelectorAll('.edit-form__field');
  const buttonSave = popup.querySelector('.edit-form__save-button');

  //Проходим по массиву объектов с начальными кнопками, устанавливаем начальное значение вместо текущего
  for(let i = 0; i<initialButtonStates.length; i++) {
    if (initialButtonStates[i].button === buttonSave) {
      buttonSave.disabled = initialButtonStates[i].disabled;

      initialButtonStates[i].disabled ? buttonSave.classList.add('edit-form__save-button_inactive') : buttonSave.classList.remove('edit-form__save-button_inactive');

      break;
    }
  } //Это кажется безумием, но отчаянные времена требуют отчаянных мер.

  errors.forEach(error => error.textContent = "");
  fields.forEach(field => field.classList.remove('edit-form__field_type_error'));

}

function closePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened');
  clearErrors(currentPopup);
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
});

profileAddButton.addEventListener('click', () => {
  placeNameField.value = "";
  placeLinkField.value = "";
  openPopup(popupCreatePlace);

});

formEditInfo.addEventListener('submit', submitProfileForm);
formCreatePlace.addEventListener('submit', submitCreatePlaceForm);
popupCloseButtons.forEach(button =>
  button.addEventListener('click', () => closePopup(button.closest('.popup'))));

