import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        super.open();
        this._element.querySelector('.popup__image').alt = name;
        this._element.querySelector('.popup__image').src = link;
        this._element.querySelector('.popup__caption').textContent = name;
    }
}