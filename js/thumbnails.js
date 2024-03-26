
import {arrayPhotos} from './data.js';
// eslint-disable-next-line no-unused-vars
import {openBigPicture} from './big-picture.js';

const thumbnailsList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsFragment = document.createDocumentFragment();

const renderThumbnails = () => thumbnailsList.append(thumbnailsFragment); {
  arrayPhotos.forEach(({url, description, likes, comments}) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    const thumbnailsImage = thumbnail.querySelector('.picture__img');

    thumbnailsImage.src = url;
    thumbnailsImage.alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    // eslint-disable-next-line no-undef


    thumbnailsFragment.append(thumbnail);
  });

}

export {renderThumbnails};
