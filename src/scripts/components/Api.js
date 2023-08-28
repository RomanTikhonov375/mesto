export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }


    //Метод для обработки ошибке в запросе
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    //Метод для запроса карточек с сервера
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });

    }

    //Метод для запроса текущего пользователя с сервера
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });


    }

    //Метод для обновления данных пользователя на сервере
    editingProfile(x, y) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: x,
                about: y
            })
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            })
    }

    //Метод для добавления карточки пользователя на сервер
    setUserCard(x, y) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: x,
                link: y
            })
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            })
    }

    //Метод для удаления карточки пользователя с сервера
    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}/`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(this._checkResponse)
    }

    //Метод для добавления лайка пользователя на сервер
    setLikeCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(this._checkResponse)

    }

    //Метод для удаления лайка пользователя с сервера
    removeLikeCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(this._checkResponse)
    }

      //Метод для изменения аватара пользователя на сервере
    setAvatar(url) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: url
            })
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            })
    }

}
