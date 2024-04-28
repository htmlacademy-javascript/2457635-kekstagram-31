import { arrayPhotos } from './data.js';
import {renderThumbnails} from './thumbnails.js';
import './scale-img.js';
import './effect-slider.js';
import './big-picture.js';
import {initUploadModal} from './upload-photo-form.js';


renderThumbnails(arrayPhotos);
initUploadModal();

