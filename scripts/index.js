const container = document.querySelector('.container');
const editButton = container.querySelector('.profile__edit-button');
const addButton = container.querySelector('.profile__add-button');

const saveButton = container.querySelector('.edit-form__save-button');

const popup = container.querySelector('.popup');
const editPopup = container.querySelector('.popup_type_info-edit');
const addPopup = container.querySelector('.popup_type_add-post');
const imagePopup = container.querySelector('.popup_type_image');

const profileName = container.querySelector('.profile__name');
const profileDescription = container.querySelector('.profile__description');

const editForm = container.querySelector('.edit-form_type_info-edit');

const nameField = container.querySelector('.edit-form__field_type_name');
const descriptionField = container.querySelector('.edit-form__field_type_description');

const addForm = container.querySelector('.edit-form_type_add');

const placeTemplate = container.querySelector('.place-template').content;
const placesTable = container.querySelector('.places__table');

const placeNameField = container.querySelector('.edit-form__field_type_place-name');
const placeLinkField = container.querySelector('.edit-form__field_type_place-link');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Якутия',
    link: 'https://thumb.tildacdn.com/tild3830-3463-4639-b834-383663626162/-/resize/960x/-/format/webp/shutterstock_1971476.jpg'
  },
  {
    name: 'Курильские острова',
    link: 'https://thumb.tildacdn.com/tild3238-3334-4631-a566-333233616431/-/resize/960x/-/format/webp/shutterstock_2075242.jpg'
  },
  {
    name: 'Пермский край',
    link: 'https://thumb.tildacdn.com/tild3232-3038-4530-b531-623461306364/-/resize/960x/-/format/webp/shutterstock_7075422.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

loadPosts();

function formSubmitHandler (evt) {
  evt.preventDefault();
  if (evt.target.classList.value.includes('info-edit')) {
    saveInfo();
  }
  else if (evt.target.classList.value.includes('add')) {
    addPost();
  }
  closePopup(evt.target.parentElement.parentElement);
}

function addPost() {
  const newPlace = {};
  initialCards.unshift(newPlace);
  initialCards[0].name = placeNameField.value;
  initialCards[0].link = placeLinkField.value;

  const place = placeTemplate.querySelector('.places__place').cloneNode(true);
  place.querySelector('.places__image').src = initialCards[0].link;
  place.querySelector('.places__title').textContent = initialCards[0].name;
  placesTable.insertBefore(place, placesTable.firstChild);
  setButtonsListeners(place, initialCards[0].name);
}

function loadPosts() {
  initialCards.forEach((item) => {
    const place = placeTemplate.querySelector('.places__place').cloneNode(true);
    place.querySelector('.places__image').src = item.link;
    place.querySelector('.places__title').textContent = item.name;
    placesTable.append(place);
    setButtonsListeners(place, item.name);
  });
}

function setButtonsListeners(target, caption) {
  const likeButton = target.querySelector('.places__like-button');
    likeButton.addEventListener('click', function(evt) {
      evt.target.classList.toggle('places__like-button_active');
    })

    const deleteButton = target.querySelector('.places__delete-button');
    deleteButton.addEventListener('click', function(evt) {
      evt.target.parentElement.parentElement.remove();
    })

    const openedImage = target.querySelector('.places__image');
    openedImage.addEventListener('click', function(evt) {
      openPopup(imagePopup);
      const popupImage = container.querySelector('.popup__image');
      popupImage.src = evt.target.src;

      const imageCaption = container.querySelector('.popup__caption');
      imageCaption.textContent = caption;
    })
}

function openPopup(currentPopup) {
  currentPopup.classList.add('popup_opened');
  const closeButton = currentPopup.querySelector('.popup__close-button').addEventListener
  ('click', () => closePopup(currentPopup));

  if (currentPopup.classList.value.includes('info-edit')) {
    fillFields();
  }
  else if (currentPopup.classList.value.includes('add-post')) {
    placeNameField.value = "";
    placeLinkField.value = "";

  }
}

function closePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened');
}

function fillFields() {
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;

}

function saveInfo() {
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
}


editButton.addEventListener('click', () => openPopup(editPopup));
addButton.addEventListener('click', () => openPopup(addPopup));
editForm.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', formSubmitHandler);
