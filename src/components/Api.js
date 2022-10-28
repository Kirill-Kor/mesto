export default class Api {
  constructor(options) {
    this._options = {...options};
  }

  getInitialCards() {
    return fetch(this._options.baseUrl + 'cards', this._options)
      .then((result) => {
        if(result.ok) {

          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      })

  }

  getUserInfo() {
    return fetch( this._options.baseUrl + 'users/me', this._options)
      .then((result) => {
        if(result.ok) {

          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      });
  }

  patchUserInfo({name, about}) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({name: name, about: about});
    return fetch(this._options.baseUrl + 'users/me', this._options)
      .then((result) => {
        if(result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      });

  }

  addNewCard({name, link}) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({name: name, link: link});
    return fetch(this._options.baseUrl + 'cards', this._options)
      .then((result) => {
        if(result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      });
  }

  deleteCard(cardId) {
    this._options.method = "DELETE";
    return fetch(this._options.baseUrl + 'cards/' + cardId, this._options);
  }

  setLike(cardId) {
    this._options.method = "PUT";
    return fetch(this._options.baseUrl + 'cards/' + cardId + '/likes', this._options)
      .then((result) => {
        if(result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      });
  }

  deleteLike(cardId) {
    this._options.method = "DELETE";
    return fetch(this._options.baseUrl + 'cards/' + cardId + '/likes', this._options)
      .then((result) => {
        if(result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      });
  }

  patchUserAvatar(avatarLink) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({avatar: avatarLink});
    return fetch(this._options.baseUrl + 'users/me/avatar', this._options)
      .then((result) => {
        if(result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
    })
  }
}
