import '../pages/index.css';
import { Card } from "../scripts/components/Card.js";
import { initialCards, CONFIG_FORM_VALIDATION } from "../scripts/constans.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from '../scripts/components/Api.js';
import { Popup } from '../scripts/components/Popup';
import { PopupWithConfirmButton } from '../scripts/components/PopupWithConfirmButton.js';


const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const buttonAddCard = page.querySelector('.profile__add-button');
const cardAddPopupImgHeadingInput = page.querySelector('.popup__input_type_place');
const formEditProfile = document.forms['edit-profile'];

const cardList = new Section({
    renderer: (item) => {
        createCard(item, cardList);
    },
}, '.cards-list');

function renderCard(obj) {
    obj.renderItems();
}

//Создаем экземпляп класса Api с данными пользователя и когорты
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
    headers: {
        authorization: 'ef82b72f-312f-4f17-b9cd-ed4bbdfcd441',
        'Content-Type': 'application/json'
    }
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([getUserInfo, getInitialCards]) => {
        userInformation.setUserInfo(getUserInfo);
        userId = getUserInfo._id;
        getInitialCards.forEach(
            item => {
                createCard(item, cardList, userId)
                console.log(item);
            }
        )
    })

// Создание эземляра класса PopupWithImage
const imagePopup = new PopupWithImage('.imageCard-popup');

const userInformation = new UserInfo(
    {
        userNameSelector: '.profile__user-name',
        userCareerSelector: '.profile__career'
    });

// Функция создания эземляра класса Card
// Параметры для передачи
// item: элемент с полями name & link, 
// cardList: разметка подготовленная классом Section,
// ".cards-list-container": селектор Template элемента,
// handleCardClick: Функция для передачи колбэка, для открытия imagePopup
function getCard(item, userId) {
    const card = new Card(item, ".cards-list-container", handleCardClick, userId, handleDeleteCard, handleLikeCard);
    return card.getView();

};

function createCard(item, cardlist, userId) {
    const cardElement = getCard(item, userId);
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
    api.editingProfile(obj.name, obj.about);
    userInformation.setUserInfo(obj);
};

// Функция обработчик отправки формы cardPopup
function createUserCard(obj) {
    api.setUserCard(obj.name, obj.link)
        .then(obj => {
            createCard(obj, cardList, userId)
        })
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

const deletePopup = new PopupWithConfirmButton('.delete-popup');
deletePopup.setEventListeners();

const handleDeleteCard = (id, card) => {
    deletePopup.setConfirmAction(() => {
        if (card.userId === card.ownerId) {
            console.log(card);
            api.deleteCard(id)
                .then(() => {
                    deletePopup.close();
                    card.delete();
                })
        }
    })
}

const handleLikeCard = (id, card) => {
    if (card._likeCounter.some(like => {
        console.log(like._id === userId)
        return like._id === userId
    })) {
        api.removeLikeCard(id)
            .then(res => {
                card._setLikeCounter(res.likes);
                res.likes = card._likeCounter
                console.log(res.likes)
                
            });
            card._likeCard()
    } else {
        api.setLikeCard(id)
            .then(res => {
                card._setLikeCounter(res.likes);
                res.likes = card._likeCounter;
                console.log(res.likes)
            })
            card._likeCard();

    }
}
