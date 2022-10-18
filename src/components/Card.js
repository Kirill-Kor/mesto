
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
      .querySelector('.card')
      .cloneNode(true);
    return placeElement;
  }

  createPlace() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.card__image');
    this._image.src = this._link;
    this._image.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._addEventListeners();
    return this._element;
  }

  _addEventListeners() {
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', this._handleLikeButtonClick.bind(this));

   this._deleteButton = this._element.querySelector('.card__delete-button');
    this._deleteButton.addEventListener('click', this._handleDeleteButtonClick.bind(this));

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._image.src, this._title);
    })
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }
}
