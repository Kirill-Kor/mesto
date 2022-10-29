export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileInfo = document.querySelector(infoSelector);
    this._profileAvatar = document.querySelector('.profile__avatar');
  }

  getUserInfo() {
    return {name: this._profileName.textContent, about: this._profileInfo.textContent};
  }

  setUserInfo({name, about, _id, avatar}) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = about;
    this._profileAvatar.src = avatar;
    this._id = _id;
  }

  getId() {
    return this._id;
  }
}
