import { renderPicturesWithDebounce } from './thumbnails.js';
import { data } from './main.js';

const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const imageFilter = document.querySelector('.img-filters');
const imageFilterButton = imageFilter.querySelector('.img-filters__form');

const getRandomPhotos = (data) => {
  for (let i = 0 ; (i < 10) && (i < data.length) ; i++) {
    const r = Math.floor(Math.random() * (data.length - i)) + i;
    const photo = data[r];
    data[r] = data[i];
    data[i] = photo;
  }
  return data.slice(0, 10);
};

const getDiscussedPhotosFirst = (data) => {
  const sortData = data.sort((a, b) => b.comments.length - a.comments.length);
  return sortData;
};

const getFilterData = (id)=> {
  const idToFilter = {
    'filter-default': data,
    'filter-random': getRandomPhotos([...data]),
    'filter-discussed': getDiscussedPhotosFirst ([...data])
  };
  return idToFilter[id];
};

const setActiveFilterButton = (evt) => {
  imageFilterButton.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const onFilterClick = (evt) => {
  const pictures = getFilterData (evt.target.id);
  setActiveFilterButton(evt);
  renderPicturesWithDebounce(pictures);
};

const initializeFilters = () => {
  imageFilter.classList.remove('img-filters--inactive');

  filterDefaultButton.addEventListener('click', onFilterClick);
  filterRandomButton.addEventListener('click', onFilterClick);
  filterDiscussedButton.addEventListener('click', onFilterClick);
};

export {initializeFilters};
