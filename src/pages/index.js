import '../pages/index.css';
import { Card } from "../scripts/components/Card.js";
import { initialCards, CONFIG_FORM_VALIDATION } from "../scripts/constans.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from "../scripts/components/UserInfo.js";

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const buttonAddCard = page.querySelector('.profile__add-button');
const cardAddPopupImgHeadingInput = page.querySelector('.popup__input_type_place');
const formEditProfile = document.forms['edit-profile'];

// Создание эземляра класса PopupWithImage
const imagePopup = new PopupWithImage('.imageCard-popup');

const userInformation = new UserInfo(
    {
        userNameSelector: '.profile__user-name',
        userCareerSelector: '.profile__career'
    });

// Создание эземляра класса Section
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        createCard(item, cardList);
    },
}, '.cards-list');

function renderCard(obj) {
    obj.renderItems();
}

 renderCard(cardList);

// Функция создания эземляра класса Card
// Параметры для передачи
// item: элемент с полями name & link, 
// cardList: разметка подготовленная классом Section,
// ".cards-list-container": селектор Template элемента,
// handleCardClick: Функция для передачи колбэка, для открытия imagePopup
function getCard(item) {
    const card = new Card(item, ".cards-list-container", handleCardClick);
    return card.getView();

};

function createCard(item, cardlist) {
    const cardElement = getCard(item);
    cardlist.addItem(cardElement);
}

// Функция добавления в инпуты информации со страницы
function editProfileFormAddDefaultInputs() {
    const userInformationData = userInformation.getUserInfo();
    formEditProfile['user-name'].value = userInformationData.userName;
    formEditProfile['user-career'].value = userInformationData.userCareer;
};

// Навешиваем слушатели на кнопку создания пользовательской карточки
buttonAddCard.addEventListener('click', () => {
    cardPopup.open();
    formValidators['edit-card'].disableSbmButton();
    formValidators['edit-card'].resetErrors();
    focusOnIput(cardAddPopupImgHeadingInput);
});

// Навешиваем слушатели на кнопку редактирования профиля
editButton.addEventListener('click', () => {
    profilePopup.open();
    editProfileFormAddDefaultInputs();
    formValidators['edit-profile'].disableSbmButton();
});

// Функция обработчик отправки формы profilePopup
function handleEditUserFormSubmit(obj) {
    userInformation.setUserInfo(obj);
};

// Функция обработчик отправки формы cardPopup
function createUserCard(obj) {
    createCard(obj, cardList);
    cardPopup.close();
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
    imagePopup.open(name, link);
}

imagePopup.setEventListeners();

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(CONFIG_FORM_VALIDATION);

const cardPopup = new PopupWithForm('.cardAdd-popup', createUserCard);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm('.editProfile-popup', handleEditUserFormSubmit);
profilePopup.setEventListeners();
