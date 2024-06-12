import { resetImageSizeToDefault } from './scale-img.js';
import { resetFilterToDefault, resetEffectSlider } from './effect-slider.js';
import { isEscapeKey } from './util.js';
import { showModal } from './util.js';
import { sendData } from './api.js';

// const FILE_TYPES = ['jpg','jpeg','png','gif','jfif'];

const uploadForm = document.querySelector('.img-upload__form');
// const uploadFileInputElement = document.querySelector('.img-upload__input');
// const uploadPreview = document.querySelector('.img-upload__preview');
// const uploadPreviewEffect = document.querySelector('.effect__ preview');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitElement = uploadForm.querySelector('#upload-submit');

const HASHTAGS_COUNT_MAX = 5;
const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;

const HASHTAG_VALIDATION_ERROR_MESSAGES = {
  HASHTAG_INVALID: 'Введен невалидный хештег',
  HASHTAG_NOT_UNIQUE: 'Хэштэг должен быть уникальным!',
  HASHTAG_COUNT_INVALID: `Хэштэгов может быть только ${HASHTAGS_COUNT_MAX}!`,
};

const checkIndividualHashtag = (hashtagsList) => hashtagsList.every((hashtag) => hashtagRegexp.test(hashtag));

const checkUniqueHashtag = (hashtagsList) => hashtagsList.every((value, index, array) => array.lastIndexOf(value) === index);

const checkHashtagCount = (hashtagsList) => hashtagsList.length <= HASHTAGS_COUNT_MAX;

const validateHashtags = () => {
  const hashtagsList = hashtagInput.value.trim().split(' ').map((hashtag) => hashtag.toLowerCase());

  return checkIndividualHashtag(hashtagsList) && checkUniqueHashtag(hashtagsList) && checkHashtagCount(hashtagsList);
};

const getHashtagValidationErrorMessage = () => {
  const hashtagsList = hashtagInput.value.trim().split(' ').map((hashtag) => hashtag.toLowerCase());

  if (!checkIndividualHashtag(hashtagsList)) {
    return HASHTAG_VALIDATION_ERROR_MESSAGES.HASHTAG_INVALID;
  }
  if (!checkUniqueHashtag(hashtagsList)) {
    return HASHTAG_VALIDATION_ERROR_MESSAGES.HASHTAG_NOT_UNIQUE;
  }
  if (!checkHashtagCount(hashtagsList)) {
    return HASHTAG_VALIDATION_ERROR_MESSAGES.HASHTAG_COUNT_INVALID;
  }
};

function onHashtagInputFocus () {
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onHashtagInputBlur () {
  document.addEventListener('keydown', onDocumentKeydown);
}

hashtagInput.addEventListener('focus', onHashtagInputFocus);
hashtagInput.addEventListener('blur', onHashtagInputBlur);

function onCommentInputFocus () {
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onCommentInputBlur () {
  document.addEventListener('keydown', onDocumentKeydown);
}

commentInput.addEventListener('focus', onCommentInputFocus);
commentInput.addEventListener('blur', onCommentInputBlur);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

pristine.addValidator(hashtagInput, validateHashtags, getHashtagValidationErrorMessage);

pristine.addValidator(commentInput, (value) => {
  const comment = value.length <= 140;
  return comment;
}, 'Много букв, остановись');

const clearForm = () => {
  uploadForm.reset();
  resetImageSizeToDefault();
  resetFilterToDefault();
  resetEffectSlider();
};

const closePhotoEditor = () => {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
  clearForm();
};

function onPhotoEditorResetBtnClick () {
  closePhotoEditor();

}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadForm.reset();
    closePhotoEditor();

  }
}

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const blockSubmitButton = () => {
  submitElement.disabled = true;
  submitElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitElement.disabled = false;
  submitElement.textContent = SubmitButtonText.IDLE;
};

const uloadForm = async () => {
  try{
    blockSubmitButton();
    await sendData(new FormData(uploadForm));
    unblockSubmitButton();
    showModal('Ура, фото загружено!', 'success');
  } catch {
    showModal('Ошибка загрузки', 'error');
    unblockSubmitButton();
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if(!pristine.validate()) {
    return;
  }
  uloadForm();
};

uploadForm.addEventListener('submit', onFormSubmit);

// function onFileInputChange () { // ?
//   const file = uploadFileInputElement.files[0];
//   const fileName = file.name.toLowerCase();
//   const fileExt = fileName.split('.').pop();
//   const matches = FILE_TYPES.includes(fileExt);
//   if(matches) {
//     const url = URL.createObjectURL(file);
//     uploadPreview.src = url;
//     uploadPreviewEffect.forEach((item) => {
//     item.style.backgroundImage = 'url(${url})';
//   });
//   }else {
//     return;
//   }
// }
//

export { initUploadModal, clearForm };
