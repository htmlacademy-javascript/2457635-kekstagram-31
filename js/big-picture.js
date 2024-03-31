import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const userModalClosePicture = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentTemplate = bigPicture.querySelector('.social__comment');
const commentSection = bigPicture.querySelector('.social__comments');
const commentsShowCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsLoad = bigPicture.querySelector('.comments-loader');


const onEscKeydown = (evt) => {
  // eslint-disable-next-line no-undef
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
};
userModalClosePicture.addEventListener('click', () => {
  closeBigPicture();
})

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
  bigPicture.querySelector('.likes-count').textContent = description;
  bigPicture.querySelector('.social__caption').textContent = description;
  renderPictureComments(comments);
};
const showBigPicture = ({url, description, likes, comments}) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  commentSection.innerHTML = '';
  renderBigPicture({url, description, likes, comments});
  commentsShowCount.classList.add('hidden');
  commentsTotalCount.classList.add('hidden');
  commentsLoad.classList.add('hidden');
  userModalClosePicture.addEventListener('click', () => {
    closeBigPicture();
  });
};


export { showBigPicture, closeBigPicture };
