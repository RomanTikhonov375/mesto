const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const closeButton = page.querySelector('.popup__close-btn');
const popup = page.querySelector('.popup');
const formEditProfile = page.querySelector('.popup__form-edit-profile');
const likeButton = page.querySelectorAll('.card__like-button');
// Функция обработчик клика 
function openPopup () {
    popup.classList.add('popup_opened');
    formEditProfile[0].value = page.querySelector('.profile__user-name').textContent;
    formEditProfile[1].value = page.querySelector('.profile__career').textContent;
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

// Добавление функции кнопкам редактировать пользователя и закрыть форму
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click',closePopup);
// Передаем значения со страницы в форму

// Функция обработчик отправки формы
function handleFormSubmit (evt) {
    evt.preventDefault();
    let profileUserName = page.querySelector('.profile__user-name');
    let profileCareer = page.querySelector('.profile__career');
    profileUserName.textContent = formEditProfile[0].value;
    profileCareer.textContent = formEditProfile[1].value;
    popup.classList.remove('popup_opened');
}

formEditProfile.addEventListener('submit', handleFormSubmit);

// Реализация функции смены состояния кнопки лайка

for (let i = 0; i < likeButton.length; i++) {
    function activeLikeButton () {
        likeButton[i].classList.toggle('card__like-button_active');
    }
    likeButton[i].addEventListener('click', activeLikeButton);
}




