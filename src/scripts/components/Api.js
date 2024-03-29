
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

    //Функция создания запроса
    _request(url, options) {
        return fetch(`${this.baseUrl}` + `${url}`, options).then(this._checkResponse)

    }

    //Метод для запроса карточек с сервера
    getInitialCards() {
        return this._request(`/cards`, {
            headers: this.headers
        })
    }

    //Метод для запроса текущего пользователя с сервера
    getUserInfo() {
        return this._request(`/users/me`, {
            headers: this.headers
        })
    }

    //Метод для обновления данных пользователя на сервере
    editingProfile(inputValues) {
        return this._request(`/users/me`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: inputValues.name,
                about: inputValues.about
            })
        })
        }

    //Метод для добавления карточки пользователя на сервер
    setUserCard(x, y) {
        return this._request(`/cards`, {
            headers: this.headers,
            method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    name: x,
                    link: y
                })
        })
        }

    //Метод для удаления карточки пользователя с сервера
    deleteCard(id) {
        return this._request(`/cards/${id}/`, {
            headers: this.headers,
            method: 'DELETE',
        })
        }

    //Метод для добавления лайка пользователя на сервер
    setLikeCard(id) {
        return this._request(`/cards/${id}/likes`, {
            headers: this.headers,
            method: 'PUT',
        })
        }

    //Метод для удаления лайка пользователя с сервера
    removeLikeCard(id) {
        return this._request(`/cards/${id}/likes`, {
            headers: this.headers,
            method: 'DELETE',
        })
        }

    //Метод для изменения аватара пользователя на сервере
    setAvatar(url) {
        return this._request(`/users/me/avatar`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url
            })
        })
        }

}
