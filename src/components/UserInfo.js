export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {name: this._name.textContent, about: this._info.textContent};
  }

  setUserInfo({name, about, _id, avatar}) {
    const profileName = document.querySelector('.profile__name');
    const profileDescription = document.querySelector('.profile__description');
    const profileAvatar = document.querySelector('.profile__avatar');
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileAvatar.src = avatar;
  }

  setId({_id}) {
    this._id = _id;
  }

  getId() {
    return this._id;
  }
}
