// eslint-disable-next-line quotes
import { isEscapeKey } from "./util.js";

// Находим классы
const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file'); // открытие формы
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

// const hashtagInput = uploadForm.querySelector('.text__hashtags');
// const commentInput = uploadForm.querySelector('.text__description');

// открытие/закрытие формы

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

// Загрузка нового изображения:
// выбор файла с изображением для загрузки;
// изменение масштаба изображения;
// применение одного из заранее заготовленных эффектов;
// выбор глубины эффекта с помощью ползунка;
// добавление текстового комментария;
// добавление хэштегов.

// закрытие формы см пункт 1.3


// Форма редактирования изображения см пункт 1.2

//код для валидации формы добавления изображения, используя Pristine. Список полей для валидации:

//Хэш-теги
// хэштег начинается с символа # (решётка);
// строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// хеш-тег не может состоять только из одной решётки;
// максимальная длина одного хэштега 20 символов, включая решётку;
// хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// хэштеги разделяются пробелами;
// один и тот же хэштег не может быть использован дважды;
// нельзя указать больше пяти хэштегов;
// хэштеги необязательны;
// если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

//Комментарий
// комментарий не обязателен;
// длина комментария не может составлять больше 140 символов;
// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

// Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму
// и не давала этого сделать, если форма заполнена не по правилам.
// При желании, реализуйте проверки сразу при вводе значения в поле. см пункт 3.2
