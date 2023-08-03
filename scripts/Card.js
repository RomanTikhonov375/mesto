import { page, openPopup, imageCardPopup } from "./index.js";

export class Card {
    // Передаем в констуктор данные для карточки и селектор темплейт элемента
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._template = templateSelector;
        this._element = document.querySelector(templateSelector).content.cloneNode(true); // создаем темплейт элемент
        this._like = this._element.querySelector('.card__like-button'); // находим кнопку лайка
        this._trash = this._element.querySelector('.card__trash'); // находим кнопку корзины
        this._image = this._element.querySelector('.card__image'); // находим элемент с картинкой
    }

    // Метод установки данных для карточки
    _setData() {
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;

        return this._element;
    }

    // Метод открытия попапа с картинкой 
    _openImagePopup() {
        page.querySelector('.popup__image').alt = this._name;
        page.querySelector('.popup__image').src = this._link;
        page.querySelector('.popup__caption').textContent = this._name;
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
            this._openImagePopup();
            openPopup(imageCardPopup);
        });

        this._like.addEventListener('click', () => this._likeCard());
        this._trash.addEventListener('click', () => this._deleteCard()); // функция удаления карточки

    }

    // Публичный метод для рендера карточки
    getView() {
        this._setEventListeners();
        return this._setData();
    }


}