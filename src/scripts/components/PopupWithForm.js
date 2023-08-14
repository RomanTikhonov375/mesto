import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
    }

    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._formElements = this._element.querySelectorAll('.popup__form');
        this._formElements.forEach(form => {
            form.reset();
        });
    }

}