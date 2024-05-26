import { resetImageSizeToDefault } from "./scale-img.js";
import { isEscapeKey } from "./util.js";
// import { showAlert, showSuccess } from "./util.js";
// import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
// const SubmitElenement = uploadForm.querySelector('#upload-submit')

// const SubmitButtonText = {
//   IDLE: 'Опубликовать',
//   SENDING: 'Отправляю...'
// };

const clearForm = () => {
  uploadForm.reset();
  resetImageSizeToDefault();
};

const closePhotoEditor = () => {
  // uploadForm.removeEventListener('submit', onFormSubmit);
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('.modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
  clearForm();
};

function onPhotoEditorResetBtnClick () {
  closePhotoEditor();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadForm.reset();
    closePhotoEditor();
  }
};

const initUploadModal = () => {
  // uploadForm.addEventListener('submit', onFormSubmit);
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('.modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// const uploadDataToServer = async () => {
//   const formData = new FormData(uploadForm);

  // const blockSubmitButton = () => {
  //   submitElenement.disabled = true;
  //   submitElenement.textContent = SubmitButtonText.SENDING;
  // };
//   await sendData(formData);

  // const unblockSubmitButton = () => {
  //   submitElenement.disabled = false;
  //   submitElenement.textContent = SubmitButtonText.IDLE;
  // };

// const onFormSubmit = async (evt) => {
//   evt.preventDefault();

//   hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, '');

//   if (!pristine.validate()) {
//     return;
//   }

//   uploadDataToServer();
// };

const onFormSubmit = (cb) => {
  uploadForm.addEventListener ('submit', async (evt) => {
    evt.preventDefault();

    const isvalid = pristine.validate();

    if(isvalid) {
      blockSubmitButton();
      await cb(new FormData(uploadForm));
      unblockSubmitButton();
    }
  })

};

pristine.addValidator(hashtagInput, (value) => {
  const hasNumber = /\d/.test(value);
  return !hasNumber;
}, 'Ошибка закралась');

pristine.addValidator(commentInput, (value) => {
  const comment = value.length <= 140;
  return comment;
}, 'Много букв, остановись');

uploadForm.addEventListener('submit', onFormSubmit);

export { initUploadModal, clearForm};
