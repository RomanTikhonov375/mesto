export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._element = document.querySelector(popupSelector);
        this._closeButton = this._element.querySelector('.popup__close-btn');
        this._handleEscClose = this._handleEscClose.bind(this)
    };
   

    close() {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };


    open() {
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);

    };

    setEventListeners() {
        this._element.addEventListener('click', this._handleOverlayClose.bind(this));
        this._closeButton.addEventListener('click', this.close.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        };
    };

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();

        };
    };


}