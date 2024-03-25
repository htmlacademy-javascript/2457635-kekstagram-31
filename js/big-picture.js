// eslint-disable-next-line no-unused-vars
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
// eslint-disable-next-line no-unused-vars
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
// eslint-disable-next-line no-unused-vars
const bigPictureLike = bigPicture.querySelector('.likes-count');
// eslint-disable-next-line no-unused-vars
const bigPictureComment = bigPicture.querySelector('.social__comment-count');
// eslint-disable-next-line no-unused-vars
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
// eslint-disable-next-line no-unused-vars
const bigPictureCommentShownCount = bigPictureComment.querySelector('.social__comment-shown-count');
// eslint-disable-next-line no-unused-vars
const bigPictureCommentTotalCount = bigPictureComment.querySelector('.social__comment-total-count');
// eslint-disable-next-line no-unused-vars
const bigPictureDescription = bigPicture.querySelector('.social__caption');
// eslint-disable-next-line no-unused-vars
const bigPictureClose = bigPicture.querySelector('#picture-cancel');
// eslint-disable-next-line no-unused-vars
const comments = bigPicture.querySelector('.social__comments');

const onPictureEscapeKeydown = (evt) => {
  // eslint-disable-next-line no-undef
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};
// eslint-disable-next-line no-unused-vars
function openBigPicture () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPictureEscapeKeydown);
}
// eslint-disable-next-line no-unused-vars
function closeBigPicture () {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onPictureEscapeKeydown);
}

bigPictureImg.addEventListener('click', () => {
  openBigPicture();
});

bigPictureImg.addEventListener('keydown', (evt) => {
  // eslint-disable-next-line no-undef
  if (isEnterKey(evt)) {
    openBigPicture();
  }
});

bigPictureImg.addEventListener('click', () => {
  closeBigPicture();
});

bigPictureImg.addEventListener('keydown', (evt) => {
  // eslint-disable-next-line no-undef
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});




export {openBigPicture};
