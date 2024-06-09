import { debounce } from './util.js';

const thumbnailsList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('a');
const thumbnailsFragment = document.createDocumentFragment();

function renderThumbnails (arrayPhotos) {
  arrayPhotos.forEach(({ id, url, description, likes, comments }) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    const thumbnailsImage = thumbnail.querySelector('.picture__img');

    thumbnail.dataset.id = id;
    thumbnailsImage.src = url;
    thumbnailsImage.alt = description;

    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnailsFragment.append(thumbnail);
  });
  thumbnailsList.append(thumbnailsFragment);
};

const resetPhotos = () => {
  thumbnailsList.querySelectorAll('.picture').forEach((picture)=> {
    picture.remove();
  });
};

const renderPictures = (data) => {
  resetPhotos();
  data.forEach((cardObj) => {
    fragment.appendChild(fillCardTemplate(cardObj));
  });
  document.appendChild(fragment);
};

const renderPicturesWithDebounce = debounce(renderPictures);

export { renderThumbnails, renderPicturesWithDebounce };


