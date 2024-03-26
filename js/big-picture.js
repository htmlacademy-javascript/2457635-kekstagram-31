// eslint-disable-next-line no-unused-vars
import {isEscapeKey} from './util.js';

// eslint-disable-next-line no-unused-vars
const MIN_SHOW_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');

const onPictureEscapeKeydown = (evt) => {
  // eslint-disable-next-line no-undef
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// eslint-disable-next-line no-unused-vars
function openBigPicture () { // картинка открывается
  bigPicture.classList.remove('hidden');// удаляем класс
  document.body.classList.add('modal-open'); // добавляем класс
  document.addEventListener('keydown', onPictureEscapeKeydown);
}
// eslint-disable-next-line no-unused-vars
function closeBigPicture () { // картинка закрывается
  bigPicture.classList.add('hidden');
  // eslint-disable-next-line quotes
  document.body.classList.remove("modal-open"); // удаляем класс
  document.removeEventListener('keydown', onPictureEscapeKeydown);
}

bigPicture.addEventListener('click', () => {
  openBigPicture();
});

bigPicture.addEventListener('keydown', (evt) => {
  // eslint-disable-next-line no-undef
  if (isEnterKey(evt)) {
    openBigPicture();
  }
});

bigPicture.addEventListener('click', () => {
  closeBigPicture();
});

bigPicture.addEventListener('keydown', (evt) => {
  // eslint-disable-next-line no-undef
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});

// заполнение данными фото
// eslint-disable-next-line no-unused-vars
const renderPictureInformation = ({ url, description, likes, comments }) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url; // адрес изображения
  bigPicture.querySelector('.big-picture__img').querySelector('img').alt = // альтернативный текст
    description;
  bigPicture.querySelector('.likes-count').textContent = likes; // кол-во лайков
  bigPicture.querySelector('.social__caption').textContent = description; // описание фотографии
  bigPicture.querySelector('.social__comment-shown-count').textContent =
    comments.length; // кол-во комментарий
  bigPicture.querySelector('.social__comment-total-count').textContent =
    comments.length; // кол-во комментарий
  renderPictureInformation(); // в какой модуль перенести?
};

// спрятать блоки счетчика
// eslint-disable-next-line no-unused-vars
const tempCommentsCountAndLoadDisable = () => {
// eslint-disable-next-line indent
bigPicture.querySelector('.social__comment-count').classList.add('hidden');
// eslint-disable-next-line indent
bigPicture.querySelector('.comments-loader').classList.add('hidden');
// eslint-disable-next-line indent
tempCommentsCountAndLoadDisable(); // в какой модуль перенести?
};

export {openBigPicture};
