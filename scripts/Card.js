
export class Card {
  constructor(cardData, templateSelector, openImagePopup) {
    this._title = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
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
    imageSelector.alt = this._title; //Не вижу смысла альту присваивать название заголовка, так как скринридер будет 2 раза зачитывать заголовок, а это скорее вред чем польза
                                     //Можно добавить alt с описанием в объект с картинкой, но это не будет работать для новых карточек
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
      this._openImagePopup(openedImage, this._title);
    })
  }
}
