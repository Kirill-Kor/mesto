import {openPopup} from './index.js';
export class Card {

  constructor(data, templateSelector, popup) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popup = popup;
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

      openPopup(this._popup);
      const popupImage = this._popup.querySelector('.popup__image');
      popupImage.src = openedImage.src;
      popupImage.alt = openedImage.alt;

      const imageCaption = this._popup.querySelector('.popup__caption');
      imageCaption.textContent = this._title;
    })

  }
}
