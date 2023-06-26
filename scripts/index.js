const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const closeButtons = page.querySelectorAll('.popup__close-btn');
const popups = page.querySelectorAll('.popup');
const formEditProfile = page.querySelector('.popup__form-edit-profile');
const buttonAddCard = page.querySelector('.profile__add-button');
const cardAddPopup = page.querySelector('.cardAdd-popup');
const editProfilePopup = page.querySelector('.editProfile-popup');
const imageCardPopup = page.querySelector('.imageCard-popup');

// находим список 
const cardsTemplate = document.querySelector('.cards-list-container').content; // добавляем template разметку
const cardsSection = document.querySelector('.cards-list')
// функция для создания карточки
function createCard({ name, link }) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const trashButton = cardElement.querySelector('.card__trash');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.addEventListener('click', () => {
        page.querySelector('.popup__image').src = link;
        page.querySelector('.popup__caption').textContent = name;
        openPopup(imageCardPopup);
    });

    trashButton.addEventListener('click', () => cardElement.remove()); // функция удаления карточки
    likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active')); // функция смены фона кнопки лайка
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__name').textContent = name;

    return cardElement;
};

// добавление карточек из исходного массива
function addCardsFromArray(arr) {
    arr.forEach(element => cardsSection.prepend(createCard(element)));
};
addCardsFromArray(initialCards);

// Функция добавления в инпуты информации со страницы
function editProfileForm() {
    formEditProfile['user-name'].value = page.querySelector('.profile__user-name').textContent;
    formEditProfile['user-career'].value = page.querySelector('.profile__career').textContent;
};

// Функция открытия попапов
function openPopup(element) {
    element.classList.add('popup_opened');
};

buttonAddCard.addEventListener('click', () => openPopup(cardAddPopup));
editButton.addEventListener('click', () => { openPopup(editProfilePopup); editProfileForm() });

// Функция закрытия попапов
closeButtons.forEach((elem) => {
    const currentPopup = page.closest('.popup');
    elem.addEventListener('click', () => {
        popups.forEach((currentPopup) => closePopup(currentPopup));
    });
});

function closePopup(element) {
    element.classList.remove('popup_opened');
};

// Функция обработчик отправки формы
function handleEditUserFormSubmit(evt) {
    evt.preventDefault();
    const profileUserName = page.querySelector('.profile__user-name');
    const profileCareer = page.querySelector('.profile__career');
    profileUserName.textContent = formEditProfile['user-name'].value;
    profileCareer.textContent = formEditProfile['user-career'].value;
    closePopup(editProfilePopup);
};

formEditProfile.addEventListener('submit', handleEditUserFormSubmit);


//Функция создания карточки

function createUserCard(evt) {
    evt.preventDefault();
    const placeNameCardInput = page.querySelector('.popup__input_type_place');
    const imgCardInput = page.querySelector('.popup__input_type_link');
    const name = placeNameCardInput.value;
    const link = imgCardInput.value;
    cardsSection.prepend(createCard({ name, link }));
    page.querySelector('.popup__form-edit-card').reset();
    closePopup(cardAddPopup);
};

cardAddPopup.addEventListener('submit', createUserCard);

// Не понял 6 пункт в ревью, про исправление let, в коде их нет. 