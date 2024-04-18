const thumbnailsList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
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
}

export {renderThumbnails};


