const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const buttonAddCard = page.querySelector('.profile__add-button');
const cardAddPopupImgHeadingInput = page.querySelector('.popup__input_type_place');
const buttonEditAvatar = page.querySelector('.profile__iconAvatar');
const formEditProfile = document.forms['edit-profile'];

const CONFIG_FORM_VALIDATION = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

export { page,editButton,buttonAddCard,cardAddPopupImgHeadingInput,buttonEditAvatar,formEditProfile , CONFIG_FORM_VALIDATION }