export class Card {
    // Передаем в констуктор данные для карточки и селектор темплейт элемента
    constructor(data, templateSelector, handleCardClick, userId, handleDeleteCard, handleLikeCard) {
        this._setLikeAction = handleLikeCard;
        this._deleteCard = handleDeleteCard;
        this.cardId = data._id
        this.ownerId = data.owner._id;
        this.userId = userId;
        this.likes = data.likes;
        this._name = data.name;
        this._link = data.link;
        this._template = templateSelector;
        this._element = document.querySelector(templateSelector)
            .content
            .cloneNode(true); // создаем темплейт элемент
        this._like = this._element.querySelector('.card__like-button'); // находим кнопку лайка
        this._trash = this._element.querySelector('.card__trash'); // находим кнопку корзины
        this._image = this._element.querySelector('.card__image'); // находим элемент с картинкой
        this._handlePopup = handleCardClick;
        this._deletePopup = document.querySelector('.delete-popup');
        this._card = this._element.querySelector('.card')
        this._likeCounterLength =  this._element.querySelector('.card__like-counter')
    }

     _showTrash() {
         if (this.ownerId === this.userId) {
            this._trash.classList.add('card__trash_active');
         }
     }

     setLikeCounter(likeCounter) {
        this._likeCounterLength.textContent = likeCounter.length;
     }

     _setInitialLikeCards() {
        if (this.likes.some(like => {
            return like._id === this.userId
        })) {
            this._like.classList.add('card__like-button_active');
        } else {
            this._like.classList.remove('card__like-button_active');
        }
     }

    // Метод установки данных для карточки
    _setData() {
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        this.setLikeCounter(this.likes)
    }

    // Метод удаления карточки
    _deleteCardPopup() {
        this._deleteCard(this.cardId, this);
    }

   
    // Метод лайка карточки
    likeCard() {
        this._like.classList.toggle('card__like-button_active');
    }

    // Метод устанавливки слушателей на карточку
    _setEventListeners() {
        this._image.addEventListener('click', () => {
            this._handlePopup(this._name, this._link);
        });
        this._like.addEventListener('click', () => this._setLikeAction(this.cardId, this));
        this._trash.addEventListener('click', () => this._deleteCardPopup());
       
    }

    // Публичный метод для рендера карточки
    getView() {
        this._showTrash();
        this._setEventListeners();
        this._setData();
        this._setInitialLikeCards()
        return this._element;
    }

    // Метод для удаления карточки
    delete() {
        this._card.remove();
    }

}