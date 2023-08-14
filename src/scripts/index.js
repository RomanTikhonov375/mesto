import '../pages/index.css';
import { Card } from "./components/Card.js";
import { initialCards, CONFIG_FORM_VALIDATION } from "./constans.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import { Popup } from "./components/Popup.js";
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from "./components/UserInfo.js";

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const popups = page.querySelectorAll('.popup');
const formEditProfile = page.querySelector('.popup__form-edit-profile');
const buttonAddCard = page.querySelector('.profile__add-button');
const cardAddPopupImgHeadingInput = page.querySelector('.popup__input_type_place');
const formEditCard = page.querySelector('.popup__form-edit-card');

// Создание эземляра класса PopupWithImage
const imagePopup = new PopupWithImage('.imageCard-popup');

const userInformation = new UserInfo(
    {
        userNameSelector: '.profile__user-name',
        userCareerSelector: '.profile__career'
    });


// Функция создания эземляра класса Section
// data - параметр для передачи массива с данными 
function renderCard(data) {
    const CardList = new Section({
        items: data,
        renderer: (item) => {
            createCard(item, CardList);
        },
    }, '.cards-list');
    CardList.renderItems();
}

renderCard(initialCards);

// Функция создания эземляра класса Card
// Параметры для передачи
// item: элемент с полями name & link, 
// cardList: разметка подготовленная классом Section,
// ".cards-list-container": селектор Template элемента,
// handleCardClick: Функция для передачи колбэка, для открытия imagePopup
function createCard(item, cardlist) {
    const card = new Card(item, ".cards-list-container", handleCardClick);
    const cardElement = card.getView();
    cardlist.addItem(cardElement);

};

// Функция добавления в инпуты информации со страницы
function editProfileFormAddDefaultInputs() {
    const userInformationData = userInformation.getUserInfo();
    formEditProfile['user-name'].value = userInformationData.userName;
    formEditProfile['user-career'].value = userInformationData.userCareer;
};

// Навешиваем слушатели на кнопку создания пользовательской карточки
buttonAddCard.addEventListener('click', () => {
    createPopupClass('.cardAdd-popup').open();
    deactivationFormSubmitButton(CONFIG_FORM_VALIDATION, addCardValidation);
    addCardValidation.resetErrors();
    focusOnIput(cardAddPopupImgHeadingInput);
});

// Навешиваем слушатели на кнопку редактирования профиля
editButton.addEventListener('click', () => {
    createPopupClass('.editProfile-popup').open();
    editProfileFormAddDefaultInputs();
    deactivationFormSubmitButton(CONFIG_FORM_VALIDATION, userProfileValidation);
});

//Функция определения открытого попапа
function wichPopupIsOpened() {
    return Array.from(popups).find(item => item.classList.contains('popup_opened'));

};

// Функция обработчик отправки формы userInfo
function handleEditUserFormSubmit(obj) {
    userInformation.setUserInfo(obj);
};

// Функция обработчик отправки формы userCard
function createUserCard(obj) {
    renderCard(obj);
    userCard.close();
};

// Функция отключения кнопки отправки формы
function deactivationFormSubmitButton(obj, currentValidationForm) {
    const popup = wichPopupIsOpened();
    const submitBtn = popup.querySelector(obj.submitButtonSelector);
    currentValidationForm.disableSbmButton(submitBtn, obj);
};

// Функция добавления фокуса на инпут.
function focusOnIput(item) {
    setTimeout(() => {
        item.focus();
    }, 100
    );
};

// Функция открытия попапа с картинкой, для передачи в конструктор
function handleCardClick(name, link) {
    imagePopup.setEventListeners();
    imagePopup.open(name, link);
}

// Функция создания экземпляра класса FormValidator
function initializationOfValadition(data, formElement) {
    const ValidatedForm = new FormValidator(data, formElement);
    ValidatedForm.enableValidation();
    return ValidatedForm;
}
const addCardValidation = initializationOfValadition(CONFIG_FORM_VALIDATION, formEditCard);
const userProfileValidation = initializationOfValadition(CONFIG_FORM_VALIDATION, formEditProfile);

// Функция создания экземпляра класса Popup
function createPopupClass(popupSelector) {
    const popup = new Popup(popupSelector);
    popup.setEventListeners();
    return popup;
}

const userCard = new PopupWithForm('.cardAdd-popup', createUserCard);
userCard.setEventListeners();

const userInfo = new PopupWithForm('.editProfile-popup', handleEditUserFormSubmit);
userInfo.setEventListeners();
