
export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._title = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    imageSelector.alt = this._title;
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
      this._handleCardClick(openedImage.src, this._title);
    })
  }
}
