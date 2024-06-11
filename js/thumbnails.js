import { debounce } from './util.js';

const thumbnailsList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('a');
const thumbnailsFragment = document.createDocumentFragment();


function renderThumbnails (arrayPhotos) {
  resetPhotos();

  arrayPhotos.forEach(({ id, url, description, likes, comments }) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    const thumbnailsImage = thumbnail.querySelector('.picture__img');

    thumbnail.dataset.id = id;
    thumbnailsImage.src = url;
    thumbnailsImage.alt = description;renderThumbnails
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

const renderPicturesWithDebounce = debounce(renderThumbnails);

export { renderThumbnails, renderPicturesWithDebounce };
