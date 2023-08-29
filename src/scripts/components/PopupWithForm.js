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

    // setInputValues(data) {
    //     this._inputList.forEach((input) => {
    //         console.log(data[input.name])
    //       // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
    //       input.value = data[input.name];
    //     });
    //   }

    // Я не смог разобраться , какие данные в дату надо подставить , если не сложно напиши по подробнее, и последнее можно лучше тоже не понял, где это использовать

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
}