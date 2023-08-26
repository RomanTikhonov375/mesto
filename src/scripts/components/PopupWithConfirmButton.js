import { Popup } from "./Popup";

export class PopupWithConfirmButton extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmDeleteButton = document.querySelector('.popup__confirm-btn');
    }

    _setConfirmAction(handleAction) {
        this._setConfirmAction = handleAction;
    }

    setEventListeners() {
        this._confirmDeleteButton.addEventListener('click', () => this._setConfirmAction());
    }
}