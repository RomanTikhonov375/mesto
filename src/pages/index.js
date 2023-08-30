import '../pages/index.css';
import { Card } from "../scripts/components/Card.js";
import { editButton,buttonAddCard,cardAddPopupImgHeadingInput,buttonEditAvatar,formEditProfile, CONFIG_FORM_VALIDATION } from "../scripts/constans.js";
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
        createCard(item, cardList, userId);
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
        console.log(getInitialCards)
        userInformation.setUserInfo(getUserInfo);
        userInformation.setUserAvatar(getUserInfo.avatar);
        userId = getUserInfo._id;
        cardList.renderItems(getInitialCards);
        // Сложно было понять, если возможно объясни в комментарии , для чего это нужно было , чтобы сделать метод более универсальным?
    })
    .catch(console.error);

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
function getCard(item) {
    const card = new Card(item, ".cards-list-container", handleCardClick, userId, handleDeleteCard, handleLikeCard);
    return card.getView();

};

// Функция создания карточки
function createCard(item, cardlist) {
    const cardElement = getCard(item);
    cardlist.addItem(cardElement);
}


// Функция добавления в инпуты информации со страницы
function editProfileFormAddDefaultInputs() {
    const userInformationData = userInformation.getUserInfo();
    profilePopup.setInputValues({
        name: userInformationData.userName,
        about: userInformationData.userCareer
    })
}; 


// Навешиваем слушатели на кнопку создания смены аватара
buttonEditAvatar.addEventListener('click', () => {
    editAvatarPopup.open();
    formValidators['edit-avatar'].disableSbmButton();
    formValidators['edit-avatar'].resetErrors();
})


// Навешиваем слушатели на кнопку редактирования профиля
editButton.addEventListener('click', () => {
    profilePopup.open();
     editProfileFormAddDefaultInputs();
    formValidators['edit-profile'].disableSbmButton();
});

// Функция добавления фокуса на инпут.


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

const profilePopup = new PopupWithForm('.editProfile-popup', handleProfileFormSubmit);
profilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm('.edit-avatar', handleEditAvatar);
editAvatarPopup.setEventListeners();

//Создание экземпляров класса PopupWithConfirmButton
const deletePopup = new PopupWithConfirmButton('.delete-popup');
deletePopup.setEventListeners();

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
            .catch(console.error)

    } else {
        api.setLikeCard(id)
            .then(res => {
                card.setLikeCounter(res.likes);
                card.likes = res.likes;
                card.likeCard();
            })
            .catch(console.error)
    }
}


// Навешиваем слушатели на кнопку создания пользовательской карточки
buttonAddCard.addEventListener('click', () => {
    cardPopup.open();
    formValidators['edit-card'].disableSbmButton();
    formValidators['edit-card'].resetErrors();
});

// можно сделать универсальную функцию, которая принимает функцию запроса,  экземпляр попапа и текст во время загрузки (опционально)
function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {

    // изменяем текст кнопки до вызова запроса
    popupInstance.renderLoading(true, loadingText);
    request()
      .then(() => {
        // закрывать попап нужно только в `then`
        popupInstance.close()
      })
      .catch((err) => {
        // в каждом запросе нужно ловить ошибку
        console.error(`Ошибка: ${err}`);
      })
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => {
        popupInstance.renderLoading(false);
      });
  }
  
  // пример оптимизации обработчика сабмита формы профиля
  function handleProfileFormSubmit(inputValues) {
    // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
    function makeRequest() {
      // `return` позволяет потом дальше продолжать цепочку `then, catch, finally`
      return api.editingProfile(inputValues).then((userData) => {
        
        userInformation.setUserInfo(userData)
      });
    }
    // вызываем универсальную функцию, передавая в нее запрос, экземпляр попапа и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
    handleSubmit(makeRequest, profilePopup);
  }

  //Функция колбэк для смены аватара
function handleEditAvatar(obj) {
    // editAvatarPopup.submitButton.textContent = "Сохранение..."
    function makeRequest() {
        return api.setAvatar(obj.link)
        .then(
            userInformation.setUserAvatar(obj.link),
        )
    }
    handleSubmit(makeRequest, editAvatarPopup);
}

// Функция обработчик отправки формы cardPopup
function createUserCard(obj) {
    // cardPopup.submitButton.textContent = "Сохранение..."
    function makeRequest() {
        return api.setUserCard(obj.name, obj.link)
        .then(obj => {
            createCard(obj, cardList, userId)
        })
        
    }
    handleSubmit(makeRequest, cardPopup, 'Создание...');
};

//Функция колбэк для удаления карточки
const handleDeleteCard = (id, card) => {
    deletePopup.open();
    deletePopup.setConfirmAction(() => {
        if (card.userId === card.ownerId) {
            api.deleteCard(id)
                .then(() => {
                    deletePopup.close();
                    card.delete();
                })
                .catch(console.error)
        }
    })
}



