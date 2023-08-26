export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });


    }

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

    deleteCard(id){
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE', 
            headers: this.headers,
        })
        .then(this._checkResponse)
    }



}
