export class FormValidator {
  constructor(data, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        
      });
      this._setEventListeners(formElement);
    });
  };


  showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    console.log()
    errorElement.classList.add(this._errorClass);
  }

  hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
}

  _setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(this._inputSelector))
  const buttonElement = formElement.querySelector(this._submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(formElement, inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
};

_checkInputValidity (formElement, inputElement)  {
  if (!inputElement.validity.valid) {
    this.showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    this.hideInputError(formElement, inputElement);
  }
};

 _hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

 _toggleButtonState(inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    this.disableSbmButton(buttonElement);
  } else {
    this._enableSbmButton(buttonElement);
  }
};

 disableSbmButton(buttonElement) {
  buttonElement.classList.add(this._inactiveButtonClass);
  buttonElement.disabled = true;
};

 _enableSbmButton(buttonElement) {
  buttonElement.classList.remove(this._inactiveButtonClass);
  buttonElement.disabled = false;
}

}


