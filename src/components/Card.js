
export default class Card {
  constructor(cardData, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId) {
    this._title = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likesList = cardData.likes;
    this._countLikes = cardData.likes.length;
    this._ownerId = cardData.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._isLiked = this._checkIsLiked();
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector).content
      .querySelector('.card')
      .cloneNode(true);
    return placeElement;
  }

  createPlace() {

    this._image = this._element.querySelector('.card__image');
    this._image.src = this._link;
    this._image.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    if(this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }

    this.cardLikeStatement(this._countLikes, this._isLiked);

    this._addEventListeners();
    return this._element;
  }

  cardLikeStatement(likesCounter, currentStatement) {
    this._likeCounter.textContent = likesCounter;
    if (currentStatement) {
      this._likeButton.classList.add('card__like-button_active');
    }
    else {
      this._likeButton.classList.remove('card__like-button_active');
    }
    this._isLiked = currentStatement;
}

  _addEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id, this._isLiked));

    if(this._userId === this._ownerId) {
      this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id, this._handleDeleteButtonClick.bind(this)));
    }

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._image.src, this._title);
    })
  }

  _checkIsLiked() {
    return this._likesList.some(like => like._id === this._userId);
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }
}
