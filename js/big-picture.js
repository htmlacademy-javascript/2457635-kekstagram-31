import { isEscapeKey } from './utils.js';

// eslint-disable-next-line no-unused-vars
const MIN_SHOW_COMMENTS_COUNT = 5;

// eslint-disable-next-line no-unused-vars
const body = document.querySelector('body');
// eslint-disable-next-line no-unused-vars, no-use-before-define
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');

// eslint-disable-next-line no-unused-vars
const onEscKeydown = (evt) => {
  // eslint-disable-next-line no-undef
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

//Временное скрытие элементов в попапе
// eslint-disable-next-line no-unused-vars
const tempCommentsCountAndLoadDisable = () => {
  // eslint-disable-next-line indent
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  // eslint-disable-next-line indent
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  // eslint-disable-next-line indent
  };
tempCommentsCountAndLoadDisable();

// eslint-disable-next-line no-unused-vars
function closeBigPicture() { // картинка закрывается
  bigPicture.classList.add('hidden');
  // eslint-disable-next-line quotes
  body.classList.remove("modal-open"); // удаляем класс
  document.removeEventListener('keydown', onEscKeydown);
  bigPictureCancel.removeEventListener('click', closeBigPicture);

}

// eslint-disable-next-line no-unused-vars
function openBigPicture() { // картинка открывается
  bigPicture.classList.remove('hidden');// удаляем класс
  body.classList.add('modal-open'); // добавляем класс
  document.addEventListener('keydown', onEscKeydown);
  // eslint-disable-next-line no-use-before-define
  bigPictureCancel.addEventListener('click', closeBigPicture);
}

// заполнение данными фото
// eslint-disable-next-line no-unused-vars
const renderPictureInformation = ({ url, description, likes, comments }) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url; // адрес изображения
  bigPicture.querySelector('.big-picture__img').querySelector('img').alt = // альтернативный текст
    description;
  bigPicture.querySelector('.likes-count').textContent = likes; // кол-во лайков
  //bigPicture.querySelector('.social__caption').textContent = description; // описание фотографии
  bigPicture.querySelector('.social__caption').textContent = description;

};
// eslint-disable-next-line no-unused-vars
const onMiniatureClick = (thumbnail) => {
  renderPictureInformation(thumbnail);
  openBigPicture();
};

// eslint-disable-next-line no-undef
const miniaturesList = getRandomInteger();
// eslint-disable-next-line no-undef
renderThumbnails (miniaturesList, thumbnailsList);

// eslint-disable-next-line no-undef
thumbnailsLis.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    const miniature = miniaturesList.find((elem) => elem.id === Number(evt.target.id));
    onMiniatureClick(miniature);
  }
});

export {onMiniatureClick};
