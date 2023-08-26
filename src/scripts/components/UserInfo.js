export class UserInfo {
    constructor({ userNameSelector, userCareerSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userCareerElement = document.querySelector(userCareerSelector);
    }

    getUserInfo() {
        this._userData = {
            userName: this._userNameElement.textContent,
            userCareer: this._userCareerElement.textContent
        }
        return this._userData;
    }

    setUserInfo(obj) {
        this._userNameElement.textContent = obj["name"];
        this._userCareerElement.textContent = obj["about"];
    };

}