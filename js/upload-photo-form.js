// eslint-disable-next-line quotes
import { isEscapeKey } from "./util.js";

// Находим классы
const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file'); // открытие формы
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

// открытие/закрытие формы / загрузка фото

const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor(); // вызов функции закрыия формы (колбэк)

};
const onDocumentKeydown = (evt) => {
// eslint-disable-next-line indent
if (isEscapeKey(evt)) { // клавиша ESC
// eslint-disable-next-line indent
evt.preventDefault(); // отменяем действие по умолчанию
// eslint-disable-next-line indent
  uploadForm.reset(); // сбрасываем значение формы
// eslint-disable-next-line indent
closePhotoEditor(); // вызыываем функцию закрытия формы
}
};

// закрытие формы
function closePhotoEditor () {
  photoEditorForm.classList.add('hidden'); // доб.обратно класс
  pageBody.classList.remove('.modal-open'); // удаляем класс
  document.removeEventListener('keydown', onDocumentKeydown); // удаляет прослушиватель нажатия кнопки с документа
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick); //удаляет прослушиватель клика кнопки
  uploadFileControl.value = ''; //обнуляет файл
}
// открытие формы
// eslint-disable-next-line no-unused-vars
const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => { // обработчик событий
    photoEditorForm.classList.remove('hidden'); // удаление класса
    pageBody.classList.add('.modal-open'); // на body вешаем класс
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick); // добавляем прослушиватель клика кнопки
    document.addEventListener('keydown', onDocumentKeydown); //доб. прослушиватель нажатия кнопки с документа
  });
};
// валидация хэштегов/комментов
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const onFormSubmit = (evt) => { // логика проверки попытки отправить форму
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, '');
    uploadForm.submit();
  };
};

pristine.addValidator(hashtagInput, (value) => {
  const hasNumber = /\d/.test(value);
  return !hasNumber;
}, 'Ошибка здесь');

pristine.addValidator(commentInput, (value) => {
  const comment = value.length <= 140;
  return comment;
}, 'Много букв, остановись');


uploadForm.addEventListener('submit', onFormSubmit);


export {initUploadModal};
