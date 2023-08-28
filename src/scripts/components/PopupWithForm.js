import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formElement = this._element.querySelector('.popup__form');
        this.submitButton = this._element.querySelector('.popup__submit-btn');
    }


    //Метод для получения данных из инпутов форм
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }
        
    //Метод для утсановки слушателя на сабмит формы
    setEventListeners() {
        super.setEventListeners();
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }
        
    //Метод закрытия попапа
    close() {
        super.close();
        this._formElement.reset();
        };
    

}