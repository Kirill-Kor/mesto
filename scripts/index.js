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

loadPosts();

function loadPosts() {
  initialCards.forEach((item) => {
    renderPlace(createPlace(item.name, item.link), placesTable);
  });
}

function formEditInfoSubmitHandler (evt) {
  evt.preventDefault();
  saveInfo();
  closePopup(popupEditInfo);
}

function formCreatePlaceSubmitHandler (evt) {
  evt.preventDefault();
  renderPlace(createPlace(placeNameField.value, placeLinkField.value), placesTable);
  closePopup(popupCreatePlace);
}

function createPlace(placeName, placeLink) {
  const place = placeTemplate.querySelector('.places__place').cloneNode(true);
  place.querySelector('.places__image').src = placeLink;
  place.querySelector('.places__title').textContent = placeName;
  place.querySelector('.places__image').alt = "Фото";

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
}

function closePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened');
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
formEditInfo.addEventListener('submit', formEditInfoSubmitHandler);
formCreatePlace.addEventListener('submit', formCreatePlaceSubmitHandler);
popupCloseButtons.forEach(button =>
  button.addEventListener('click', () => closePopup(button.closest('.popup'))));

