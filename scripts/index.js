const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const closeButtons = page.querySelectorAll('.popup__close-btn');
const popups = page.querySelectorAll('.popup');
const formEditProfile = page.querySelector('.popup__form-edit-profile');
const buttonAddCard = page.querySelector('.profile__add-button');
const cardAddPopup = page.querySelector('.popup__addCard');
const editProfilePopup = page.querySelector('.popup__editProfile');
const imageCardPopup = page.querySelector('.popup__imageCard');

// находим список 
const cardsTemplate = document.querySelector('.cards-list-container').content; // добавляем template разметку
const cardsSection = document.querySelector('.cards-list')
// функция для создания карточки
function addCards({ name, link }) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const trashButton = cardElement.querySelector('.card__trash');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.addEventListener('click', () => {
        page.querySelector('.popup__image').src = link;
        page.querySelector('.popup__caption').textContent = name;
        imageCardPopup.classList.add('popup_opened');
    });

    trashButton.addEventListener('click', () => cardElement.remove()); // функция удаления карточки
    likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active')); // функция смены фона кнопки лайка
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__name').textContent = name;

    return cardElement;

    // cardsSection.prepend(cardElement);
};

// добавление карточек из исходного массива
function addCardFromArray(arr) {
    arr.forEach(element => cardsSection.prepend(addCards(element)));
};
addCardFromArray(initialCards);

// Функция добавления в инпуты информации со страницы
function editProfileForm() {
    formEditProfile[0].value = page.querySelector('.profile__user-name').textContent;
    formEditProfile[1].value = page.querySelector('.profile__career').textContent;
};

// Функция открытия попапов
function openPopup(element) {
    element.classList.add('popup_opened');
};

buttonAddCard.addEventListener('click', () => openPopup(cardAddPopup));
editButton.addEventListener('click', () => openPopup(editProfilePopup), editProfileForm());

// Функция закрытия попапов
closeButtons.forEach((elem) =>
    elem.addEventListener('click', () => {
        popups.forEach((element) => closePopup(element));
    }));

function closePopup(element) {
    element.classList.remove('popup_opened');
};

// Функция обработчик отправки формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    const profileUserName = page.querySelector('.profile__user-name');
    const profileCareer = page.querySelector('.profile__career');
    profileUserName.textContent = formEditProfile[0].value;
    profileCareer.textContent = formEditProfile[1].value;
    closePopup(editProfilePopup);
};

formEditProfile.addEventListener('submit', handleFormSubmit);


//Функция создания карточки

function createCard(evt) {
    evt.preventDefault();
    const placeNameCardInput = page.querySelector('.popup__input_type_place');
    const imgCardInput = page.querySelector('.popup__input_type_link');
    const name = placeNameCardInput.value;
    const link = imgCardInput.value;
    cardsSection.prepend(addCards({ name, link }));
    closePopup(cardAddPopup);
};

cardAddPopup.addEventListener('submit', createCard);
