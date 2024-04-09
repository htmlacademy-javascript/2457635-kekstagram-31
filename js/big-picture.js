import {isEscapeKey} from './util.js';
import { arrayPhotos } from './data.js';

const thumbnailsList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const userModalClosePicture = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentTemplate = bigPicture.querySelector('.social__comment'); // комментарии к изображению
const commentSection = bigPicture.querySelector('.social__comments');
const commentsShowCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const showMore = bigPicture.querySelector('.comments-loader'); //Загрузить еще
const SHOW_COMMENTS = 5;

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onEscKeydown);
  userModalClosePicture.removeEventListener('click', closeBigPicture);
};

const renderPictureComments = (comments) => {
  comments.forEach(({ avatar, message }) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__text').textContent = message;
    commentsShowCount.textContent = comments.length;
    commentsTotalCount.textContent = comments.length;
    commentSection.appendChild(comment);
  });

};

const renderBigPicture = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.big-picture__img').querySelector('img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderPictureComments(comments);
};

const showBigPicture = ({url, description, likes, comments}) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentSection.innerHTML = '';

  renderBigPicture({url, description, likes, comments});

  document.addEventListener('keydown', onEscKeydown);
  userModalClosePicture.addEventListener('click', closeBigPicture);
};

thumbnailsList.addEventListener('click', (evt) => {
  const clickedId = evt.target.closest('.picture').dataset.id;
  const thumbnailsData = arrayPhotos.find((item) => item.id === Number(clickedId));

  showBigPicture(thumbnailsData);
});


