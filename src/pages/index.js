import '../pages/index.css';
import { Card } from "../scripts/components/Card.js";
import { page,editButton,buttonAddCard,cardAddPopupImgHeadingInput,buttonEditAvatar,formEditProfile, CONFIG_FORM_VALIDATION } from "../scripts/constans.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from '../scripts/components/Api.js';
import { PopupWithConfirmButton } from '../scripts/components/PopupWithConfirmButton.js';

// Создание экзепляра класса Section
const cardList = new Section({
    renderer: (item) => {
        createCard(item, cardList);
    },
}, '.cards-list');


//Создание экземпляра класса Api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
    headers: {
        authorization: 'ef82b72f-312f-4f17-b9cd-ed4bbdfcd441',
        'Content-Type': 'application/json'
    }
});

// Сохраняем в переменную id юзера для дальнейшего использования
let userId;

// Инициализируем данные на страницы, через запрос на сервер
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([getUserInfo, getInitialCards]) => {
        userInformation.setUserInfo(getUserInfo);
        userInformation.setUserAvatar(getUserInfo);
        userId = getUserInfo._id;
        getInitialCards.forEach(
            item => {
                createCard(item, cardList, userId)
            }
        )
    })
    .catch((err) => {
        console.log(err);
    });

// Создание экземпляра класса PopupWithImage
const imagePopup = new PopupWithImage('.imageCard-popup');

//Создание экземпляра класса UserInfo
const userInformation = new UserInfo(
    {
        userNameSelector: '.profile__user-name',
        userCareerSelector: '.profile__career',
        avatarSelector: '.profile__avatar'
    });

// Функция создания эземляра класса Card
// Параметры для передачи
// item: элемент с полями name & link, 
// cardList: разметка подготовленная классом Section,
// ".cards-list-container": селектор Template элемента,
// handleCardClick: Функция для передачи колбэка, для открытия imagePopup
// handleDeleteCard: Функция для передачи колбэка, для открытия удаления карточки
// handleLikeCard: Функция для передачи колбэка, для открытия лайка карточки
function getCard(item, userId) {
    const card = new Card(item, ".cards-list-container", handleCardClick, userId, handleDeleteCard, handleLikeCard);
    return card.getView();

};

// Функция создания карточки
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


// Навешиваем слушатели на кнопку создания смены аватара
buttonEditAvatar.addEventListener('click', () => {
    editAvatarPopup.open();
})

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
    profilePopup.submitButton.textContent = "Сохранение..."
    api.editingProfile(obj.name, obj.about)
        .catch((err) => {
            console.log(err);
        })
        .finally(
            () => {
                profilePopup.submitButton.textContent = "Сохранить"
            }
        )
    userInformation.setUserInfo(obj);
};

// Функция обработчик отправки формы cardPopup
function createUserCard(obj) {
    cardPopup.submitButton.textContent = "Сохранение..."
    api.setUserCard(obj.name, obj.link)
        .then(obj => {
            createCard(obj, cardList, userId)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(
            () => {
                profilePopup.submitButton.textContent = "Создать"
            }
        )
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

//Создание экземпляров класса PopupWithForm

const cardPopup = new PopupWithForm('.cardAdd-popup', createUserCard);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm('.editProfile-popup', handleEditUserFormSubmit);
profilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm('.edit-avatar', handleEditAvatar);
editAvatarPopup.setEventListeners();

//Создание экземпляров класса PopupWithConfirmButton
const deletePopup = new PopupWithConfirmButton('.delete-popup');
deletePopup.setEventListeners();


//Функция колбэк для функции колбэка смены аватара
function changeAvatar(link) {
    const avatarElement = page.querySelector('.profile__avatar');
    avatarElement.style.backgroundImage = `url(${link})`
}

//Функция колбэк для смены аватара
function handleEditAvatar(obj) {
    editAvatarPopup.submitButton.textContent = "Сохранение..."
    api.setAvatar(obj.link)
        .then(
            editAvatarPopup.close(),
            changeAvatar(obj.link)
        )
        .catch((err) => {
            console.log(err);
        })
        .finally(
            () => {
                profilePopup.submitButton.textContent = "Сохранить"
            }
        )

}

//Функция колбэк для удаления карточки
const handleDeleteCard = (id, card) => {
    deletePopup.setConfirmAction(() => {
        if (card.userId === card.ownerId) {
            api.deleteCard(id)
                .then(() => {
                    deletePopup.close();
                    card.delete();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    })
}


//Функция колбэк для лайка карточки
const handleLikeCard = (id, card) => {
    if (card.likes.some(like => {
        return like._id === userId
    })) {
        api.removeLikeCard(id)
            .then(res => {
                card.setLikeCounter(res.likes);
                card.likes = res.likes;
                card.likeCard()

            })
            .catch((err) => {
                console.log(err);
            })

    } else {
        api.setLikeCard(id)
            .then(res => {
                card.setLikeCounter(res.likes);
                card.likes = res.likes;
                card.likeCard();
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
