import { arrayPhotos } from './data.js';
import {renderThumbnails} from './thumbnails.js';
import './big-picture.js';
import {initUploadModal} from './upload-photo-form.js';

renderThumbnails(arrayPhotos);
initUploadModal();

