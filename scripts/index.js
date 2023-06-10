const page = document.querySelector('.page');
const editButton = page.querySelector('.edit-button');
const closeButton = page.querySelector('.form-edit-profile__close-btn');
const popup = page.querySelector('.popup');
const formEditProfile = page.querySelector('.form-edit-profile');
const likeButton = page.querySelectorAll('.like-button');

function handleClick () {
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', handleClick);
closeButton.addEventListener('click',handleClick);

formEditProfile[0].value = page.querySelector('.profile__user-name').innerText;
formEditProfile[1].value = page.querySelector('.profile__career').innerText;

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
        likeButton[i].classList.toggle('like-button_active');
    }
    likeButton[i].addEventListener('click', activeLikeButton);
}




