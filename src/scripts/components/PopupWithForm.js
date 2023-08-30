import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formElement = this._element.querySelector('.popup__form');
        this.submitButton = this._element.querySelector('.popup__submit-btn');
        this._submitBtnText = this.submitButton.textContent;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
      }

    // Спасибо большое за объяснение теперь всё ясно :) 
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
        });
    }

    //Метод закрытия попапа
    close() {
        super.close();
        this._formElement.reset();
    };

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this.submitButton.textContent = loadingText;
        } else {
            this.submitButton.textContent = this._submitBtnText;
        }
    }

    _focusOnIput() {
        setTimeout(() => {
            this._inputList[0].focus();
        }, 100
        );
    };

    open() {
        super.open();
        this._focusOnIput();
    }
}