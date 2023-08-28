export class UserInfo {
    constructor({ userNameSelector, userCareerSelector, avatarSelector }) {
        this._userAvatar = document.querySelector(avatarSelector);
        this._userNameElement = document.querySelector(userNameSelector);
        this._userCareerElement = document.querySelector(userCareerSelector);
    }

    //Метод для получения данных о пользователе со страницы
    getUserInfo() {
        this._userData = {
            userName: this._userNameElement.textContent,
            userCareer: this._userCareerElement.textContent
        }
        return this._userData;
    }

    //Метод для установки данных пользователя на страницы
    setUserInfo(obj) {
        this._userNameElement.textContent = obj["name"];
        this._userCareerElement.textContent = obj["about"];
        
    };

    //Метод для установки данных пользователя на страницы
    setUserAvatar(obj){
        this._userAvatar.style.backgroundImage = `url(${obj["avatar"]})`
    }

}