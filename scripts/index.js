import { Card } from "./Card.js";
import { initialCards, CONFIG_FORM_VALIDATION } from "./constans.js";
import { FormValidator } from "./FormValidator.js";

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const closeButtons = page.querySelectorAll('.popup__close-btn');
const popups = page.querySelectorAll('.popup');
const formEditProfile = page.querySelector('.popup__form-edit-profile');
const buttonAddCard = page.querySelector('.profile__add-button');
const cardAddPopup = page.querySelector('.cardAdd-popup');
const editProfilePopup = page.querySelector('.editProfile-popup');
const imageCardPopup = page.querySelector('.imageCard-popup');
const cardAddPopupImgHeadingInput = page.querySelector('.popup__input_type_place');
const profileUserName = page.querySelector('.profile__user-name');
const profileCareer = page.querySelector('.profile__career');
const placeNameCardInput = page.querySelector('.popup__input_type_place');
const imgCardInput = page.querySelector('.popup__input_type_link');
const formEditCard = page.querySelector('.popup__form-edit-card');

// находим список 
const cardsSection = document.querySelector('.cards-list'); 


// добавление карточек из исходного массива
initialCards.forEach((item) => {
    const card = new Card(item, ".cards-list-container");
    const cardElement = card.getView();
    // Добавляем в DOM
    cardsSection.prepend(cardElement);
  });

// Функция добавления в инпуты информации со страницы
function editProfileFormAddDefaultInputs () {
    formEditProfile['user-name'].value = page.querySelector('.profile__user-name').textContent;
    formEditProfile['user-career'].value = page.querySelector('.profile__career').textContent;
};

// Функция открытия попапов
function openPopup (element) {
    element.classList.add('popup_opened');
    document.addEventListener( 'keydown', closePopupByKeyEsc );
};

// Навешиваем слушатели на кнопку создания пользовательской карточки
buttonAddCard.addEventListener('click', () => {
    openPopup(cardAddPopup);
    resetForm(CONFIG_FORM_VALIDATION, addCardValidation);
    deactivationFormSubmitButton(CONFIG_FORM_VALIDATION, addCardValidation);
    focusOnIput(cardAddPopupImgHeadingInput);
});

// Навешиваем слушатели на кнопку редактирования профиля
editButton.addEventListener('click', () => {
    
    openPopup(editProfilePopup);
    editProfileFormAddDefaultInputs();
    deactivationFormSubmitButton(CONFIG_FORM_VALIDATION, userProfileValidation);
});

// Навешиваем слушатели на все попапы для закрытия по оверлею
popups.forEach(item => item.addEventListener('click', closePopupOnOverlayClick));

//Функция определения открытого попапа
function wichPopupIsOpened () {
    return Array.from(popups).find(item => item.classList.contains('popup_opened'));

};

// Функция закрытия попапов по крестику
closeButtons.forEach((elem) => {
    const buttonPopup = elem.closest('.popup');
    elem.addEventListener('click', () => closePopup(buttonPopup));
});

//Функция закрытия попапа по нажатию на Esc
function closePopupByKeyEsc (evt) {
    const popup = wichPopupIsOpened();
    if (evt.key === "Escape") {
        closePopup(popup);
    };
};

//Фукнция закрытия попапа по оверлею
function closePopupOnOverlayClick (evt) {
    const popup = wichPopupIsOpened();
    if (evt.target === evt.currentTarget) {
        closePopup(popup);
    };
};


//Функция закрытия попапа
function closePopup (element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByKeyEsc);
};

// Функция обработчик отправки формы
function handleEditUserFormSubmit (evt) {
    evt.preventDefault();
    profileUserName.textContent = formEditProfile['user-name'].value;
    profileCareer.textContent = formEditProfile['user-career'].value;
    closePopup(editProfilePopup);
};

//Функция создания карточки
function createUserCard (evt) {
    evt.preventDefault();
    const name = placeNameCardInput.value;
    const link = imgCardInput.value;
    const card = new Card({ name, link }, ".cards-list-container");
    const cardElement = card.getView();
    cardsSection.prepend(cardElement);
    formEditCard.reset();
    closePopup(cardAddPopup);
};

// Навешиваем слушатель на кнопку самбит формы добавления карточки
cardAddPopup.addEventListener('submit', createUserCard);

// Навешиваем слушатель на кнопку самбит формы редактирования профиля
formEditProfile.addEventListener('submit', handleEditUserFormSubmit);

// Функция отключения кнопки отправки формы
function deactivationFormSubmitButton (obj, currentValidationForm) {
    const popup = wichPopupIsOpened();
    const submitBtn = popup.querySelector(obj.submitButtonSelector);
    currentValidationForm.disableSbmButton(submitBtn, obj);
};

// Функция сброса полей формы
function resetForm(obj, currentValidateForm) {
    const popup = wichPopupIsOpened();
    const currentForm = popup.querySelector(obj.formSelector);
    const inputList = popup.querySelectorAll(obj.inputSelector);
    Array.from(inputList).forEach(itemList => currentValidateForm.hideInputError(currentForm, itemList, CONFIG_FORM_VALIDATION));
    currentForm.reset();
}

// Функция добавления фокуса на инпут.
function focusOnIput (item) {
    setTimeout ( () => {
        item.focus();
    }, 100
    );
};

const addCardValidation = new FormValidator(CONFIG_FORM_VALIDATION, '.popup__form-edit-card');
addCardValidation.enableValidation();

const userProfileValidation = new FormValidator(CONFIG_FORM_VALIDATION, '.popup__form-edit-profile');
userProfileValidation.enableValidation();


export {page, openPopup, imageCardPopup};