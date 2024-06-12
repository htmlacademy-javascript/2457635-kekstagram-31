import { renderThumbnails } from './thumbnails.js';
import './scale-img.js';
import './effect-slider.js';
import './big-picture.js';
import { initUploadModal } from './upload-photo-form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { initBigPicture } from './big-picture.js';
import { initializeFilters } from './filter.js';

let data = null;

try {
  data = await getData();
  renderThumbnails(data);
  initBigPicture(data);
  initializeFilters();
  initUploadModal();
} catch {
  showAlert ('Не удалось загрузить данные');
}

export { data };

