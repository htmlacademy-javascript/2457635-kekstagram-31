import { renderThumbnails } from './thumbnails.js';
import './scale-img.js';
import './effect-slider.js';
import './big-picture.js';
import { initUploadModal } from './upload-photo-form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

let data = null;

try {
  data = await getData();
  renderThumbnails(data);
  initUploadModal();
} catch {
  showAlert ('Не удалось загрузить данные')
}



