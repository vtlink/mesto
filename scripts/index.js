const initialCards = [
    {
      name: 'Даргавс',
      link: 'https://images.unsplash.com/photo-1597581729358-7429e1b731bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    },
    {
      name: 'Париж',
      link: 'https://images.unsplash.com/photo-1599331277069-ed0546ef8713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    },
    {
      name: 'Стокгольм',
      link: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      name: 'Токио',
      link: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      name: 'Сеул',
      link: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      name: 'Агра',
      link: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    }
  ];

const container = document.querySelector('.page');

const userbox = container.querySelector('.userbox');
const popupEdit = container.querySelector('.popup_edit');
const popupAdd = container.querySelector('.popup_add');
const popupImg = container.querySelector('.popup_img');
const popups = container.querySelectorAll('.popup');

const editBtn = userbox.querySelector('.userbox__edit-btn');
const addBtn = userbox.querySelector('.userbox__add-btn');
const closeBtns = container.querySelectorAll('.popup__close-btn');

const popupImgItem = popupImg.querySelector('.popup__img-item');
const popupImgCaption = popupImg.querySelector('.popup__caption-img');

const userboxName = userbox.querySelector('.userbox__name');
const userboxStatus = userbox.querySelector('.userbox__status');

const formEdit = document.forms["edit-form"];
const nameInput = popupEdit.querySelector('#username');
const statusInput = popupEdit.querySelector('#status');

editBtn.addEventListener('click', function() {
    nameInput.value = userboxName.textContent;
    statusInput.value = userboxStatus.textContent;
    openPopup(popupEdit);
});
addBtn.addEventListener('click', function() {
    openPopup(popupAdd);
})

closeBtns.forEach((button) => {
    const popup = button.closest('.popup');

    button.addEventListener('click', () => closePopup(popup));
})

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function setImageData(src, caption) {
    popupImgItem.setAttribute('src', '');
    popupImgItem.setAttribute('alt', '');

    popupImgItem.setAttribute('src', src);
    popupImgItem.setAttribute('alt', caption);
    popupImgCaption.textContent = caption;
}



function handleFormEdit(evt) {
    evt.preventDefault();
    const enteredName = nameInput.value;
    const enteredStatus = statusInput.value;

    userboxName.textContent = enteredName;
    userboxStatus.textContent = enteredStatus;

    closePopup(popupEdit);
}

formEdit.addEventListener('submit', handleFormEdit);



const cardContainer = container.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

function addCard(nameValue, urlValue) {
    const cardElement = createCard(nameValue, urlValue);

    cardContainer.prepend(cardElement);
}

function createCard(nameValue, urlValue) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.setAttribute('src', urlValue);
    cardImage.setAttribute('alt', nameValue);
    cardElement.querySelector('.card__title').textContent = nameValue;

    cardElement.querySelector('.card__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-btn_active');
    });
    cardElement.querySelector('.card__trash-btn').addEventListener('click', function (evt) {
        cardElement.remove();
    });
    cardImage.addEventListener('click', function(evt) {
        setImageData(urlValue, nameValue);
        openPopup(popupImg);
    });

    return cardElement;
}

const fordAdd = document.forms["add-form"];
const nameValue = popupAdd.querySelector('#placename');
const urlValue = popupAdd.querySelector('#url-place');

nameValue.value = nameValue.textContent;
urlValue.value = urlValue.textContent;

function handleFormAdd(evt) {
    evt.preventDefault();
    const enteredPlacename = nameValue.value;
    const enteredUrl = urlValue.value;

    addCard(enteredPlacename, enteredUrl);

    nameValue.value = '';
    urlValue.value = '';

    closePopup(popupAdd);
}

fordAdd.addEventListener('submit', handleFormAdd)



function renderCards() {
    initialCards.forEach(function(item) {
        addCard(item.name, item.link);
    })
}

renderCards();