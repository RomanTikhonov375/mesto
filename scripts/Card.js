import {handleOpenPopup } from "./index.js";


export class Card {
    // Передаем в констуктор данные для карточки и селектор темплейт элемента
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._template = templateSelector;
        console.log(templateSelector);
        this._element = document.querySelector(templateSelector);
        console.log(document);
        console.log(this._element);
        // .content.
        // cloneNode(true); // создаем темплейт элемент
        this._like = this._element.querySelector('.card__like-button'); // находим кнопку лайка
        this._trash = this._element.querySelector('.card__trash'); // находим кнопку корзины
        this._image = this._element.querySelector('.card__image'); // находим элемент с картинкой
        this._handlePopup = handleOpenPopup;
    }

    // Метод установки данных для карточки
    _setData() {
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
    }

    // Метод удаления карточки
    _deleteCard() {
        this._trash.closest('.card').remove();
    }

    // Метод лайка карточки
    _likeCard() {
        this._like.classList.toggle('card__like-button_active');
    }

    // Метод устанавливки слушателей на карточку
    _setEventListeners() {
        this._image.addEventListener('click', () => {
            this._handlePopup(this._name, this._link);
        });
        this._like.addEventListener('click', () => this._likeCard());
        this._trash.addEventListener('click', () => this._deleteCard());

    }

    // Публичный метод для рендера карточки
    getView() {
        this._setEventListeners();
        this._setData();
        return this._element;
    }


}