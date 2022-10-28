import './index.css';

import {initialCards} from '../utils/places.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

import PopupConfirm from '../components/PopupConfirm';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api";

import {profileEditButton, profileAddButton, profileAvatarButton, formEditInfo, formCreatePlace, formChangeAvatar, validationConfig, profileAvatar} from '../utils/constants.js';

const formCreatePlaceValidation = new FormValidator(validationConfig, formCreatePlace);
formCreatePlaceValidation.enableValidation();
const formEditInfoValidation = new FormValidator(validationConfig, formEditInfo);
formEditInfoValidation.enableValidation();
const formChangeAvatarValidation = new FormValidator(validationConfig, formChangeAvatar);
formChangeAvatarValidation.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: '55a8e4ab-fab7-47ea-952b-a22a4b1ba00e',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo('.profile__name', '.profile__description');


const popupInfoEdit = new PopupWithForm('.popup_type_info-edit', (values, saveButton, buttonInitialText)=> {
    renderLoadingText(saveButton, true)
    api.patchUserInfo(values)
      .then((result) => {
      userInfo.setUserInfo(result);
    })
      .catch((err) => {
        console.log(err); //
      })
      .finally(() => {
        renderLoadingText(saveButton, false, buttonInitialText);
        popupInfoEdit.close();
      })


}, ()=> {
  return userInfo.getUserInfo();

});

const popupCreateCard = new PopupWithForm('.popup_type_add-post', (values, saveButton, buttonInitialText)=> {
  renderLoadingText(saveButton, true)
  api.addNewCard(values)
    .then((result) => {
      renderedCards.addItem(createCard(result, '.place-template'));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally( () => {
      renderLoadingText(saveButton, false, buttonInitialText);
      popupCreateCard.close();
  })
})

const popupDeleteConfirm = new PopupConfirm('.popup_type_delete-confirm', (data) => {
  api.deleteCard(data)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })

});

function renderLoadingText(button, isLoading, text) {
  if(isLoading) {
    button.textContent = "Сохранение...";
  }
  else {
    button.textContent = text;
  }


}

const popupAvatarChange = new PopupWithForm('.popup_type_new-avatar', (data, saveButton, buttonInitialText) => {
  renderLoadingText(saveButton, true);
  api.patchUserAvatar(data.link)
    .then((result) => {
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingText(saveButton, false, buttonInitialText);
      popupAvatarChange.close();
    })

})

const openedImage = new PopupWithImage('.popup_type_image');

popupInfoEdit.setEventListeners();
popupCreateCard.setEventListeners();
popupDeleteConfirm.setEventListeners();
openedImage.setEventListeners();
popupAvatarChange.setEventListeners();

function createCard({name, link, likes, owner, _id}, templateSelector) {
  const newCard = new Card(
    {name, link, likes, owner, _id},
    templateSelector,
    openImagePopup,
    (data, deleteHandler) => {  //handleDeleteClick
      popupDeleteConfirm.open(data, deleteHandler);
    },
    (cardId, isLiked) => {
      //handleLikeClick
      if(isLiked) {
        api.deleteLike(cardId)
          .then((result) => {
           newCard.removeLike(result.likes.length);
          })
      }
      else {
        api.setLike(cardId)
          .then((result) => {
           newCard.setLike(result.likes.length);
          })
      }

    },
    userInfo.getId(),

  )
  return newCard.createPlace();
}

function openImagePopup(openedImageLink, imageTitle) {
  openedImage.open(openedImageLink, imageTitle);
}

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
    userInfo.setId(result);
  })
  .catch((err) => {
    console.log(err);
  })

api.getInitialCards()
  .then((result) => {
    renderedCards.renderItems(result);
  })
  .catch((err) => {
    console.log(err);
  })


const renderedCards = new Section(
  (result) => {
    renderedCards.addItem(createCard(result, '.place-template'), true)
  },
  '.places__table',
);

profileEditButton.addEventListener('click', () => {
  popupInfoEdit.open();
  formEditInfoValidation.clearErrors();
});

profileAddButton.addEventListener('click', () => {
  popupCreateCard.open();
  formCreatePlaceValidation.clearErrors();
  formCreatePlaceValidation.setButtonDisable();
});

profileAvatarButton.addEventListener('click', () => {
  popupAvatarChange.open();
  formChangeAvatarValidation.clearErrors();
  formChangeAvatarValidation.setButtonDisable();
})




