import { arrayPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './scale-img.js';
import './effect-slider.js';
import './big-picture.js';
import { initUploadModal } from './upload-photo-form.js';
// import { getData } from './api.js';
// import { showAlert } from './util.js';

// getData()
//   .then((arrayPhotos) => {
//     renderThumbnails(arrayPhotos);
//   })
//   .catch (
//     () => {
//       showAlert ('Не удалось загрузить данные');
//     });


renderThumbnails(arrayPhotos);
initUploadModal();

