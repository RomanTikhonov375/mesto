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
        this.getUserInfo();
        this._userData.userName = obj['user-name']
        this._userData.userCareer = obj['user-career'];
        this._userNameElement.textContent = this._userData.userName;
        this._userCareerElement.textContent = this._userData.userCareer;
    };

}