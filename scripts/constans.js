const initialCards = [
    {
        name: 'Навилья',
        link: 'https://images.unsplash.com/photo-1532881002713-9ca15a9c04c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDE3MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
        name: 'Афины',
        link: 'https://images.unsplash.com/photo-1656351408322-1200d2100e59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDEyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60'

    },
    {
        name: 'Кашмир',
        link: 'https://images.unsplash.com/photo-1628017023091-543c881a48f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
        name: 'Лиссабон',
        link: 'https://images.unsplash.com/photo-1638547768492-705dbb90f0f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
        name: 'Петной-ам-Арльберг',
        link: 'https://images.unsplash.com/photo-1685025372123-935ed58fe6ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
        name: 'Ареналь',
        link: 'https://images.unsplash.com/photo-1685340475418-c85e32cc2730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60'
    }
];

const CONFIG_FORM_VALIDATION = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

export {initialCards, CONFIG_FORM_VALIDATION}