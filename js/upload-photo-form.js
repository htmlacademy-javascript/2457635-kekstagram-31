/* eslint-disable indent */
// eslint-disable-next-line quotes
import { isEscapeKey } from "./util.js";

// Находим классы
const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file'); // форма
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const imgPreview = uploadForm.querySelector('.img-upload__preview img');
const smaller = uploadForm.querySelector('.scale__control--smaller');
const bigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControl = uploadForm.querySelector('.scale__control--value');

const SCALE_STEP = 0.25;

const effectList = uploadForm.querySelector('.effects__list');
const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const slider = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
const img = imgUploadWrapper.querySelector('.img-upload__preview');

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
  }
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


// 2 часть домашнего задания

// +- изображения

let scale = 1;

const onSmallerClick = () => { // кнопка уменьшения размера
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgPreview.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;

  }
};

const onBiggerClick = () => { // кнопка увеличения размера
  if (scale < 1) {
    imgPreview.style.transform = `scale(${scale += SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;

  }
};

bigger.addEventListener('click', onBiggerClick); // клик на кнопку +
smaller.addEventListener('click', onSmallerClick); // клик на кнопку -

// эффекты на фото

noUiSlider.create(slider, {
start: 100, //0
connect: 'lower',
range: {
  'min': 0,
  'max': 1,
},
format: {
  to: (value) => Number.isInteger(value)
    ? value.toFixed(0)
    : value.toFixed(1),
  from: (value) => parseFloat(value),
},
});

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
});

effectLevel.classList.add('hidden');

const onEffectChange = (evt) => {
  const effect = evt.target.value;

  if(effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
  switch (effect) {
    case 'none':
      img.style.filter = 'none';
      break;
    case 'chrome':
      slider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1,
        },
        start: 0,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        img.style.filter = `sepia(${effectLevelValue.value})`;
      });
      break;
      case 'marvin':
        slider.noUiSlider.updateOptions({
          range: {
            'min': 0,
            'max': 100,
          },
          start: 0,
          step: 1,
        });
        slider.noUiSlider.on('update', () => {
          img.style.filter = `invert(${effectLevelValue.value})`;
        });
        break;
      case 'phobos':
        slider.noUiSlider.updateOptions({
          range: {
            'min': 0,
            'max': 3,
          },
          start: 0,
          step: 0.1,
        });
        slider.noUiSlider.on('update', () => {
          img.style.filter = `blur(${effectLevelValue.value}px)`;
        });
        break;
      case 'heat':
        slider.noUiSlider.updateOptions({
          range: {
            'min': 1,
            'max': 3,
          },
          start: 1,
          step: 0.1,
        });
        slider.noUiSlider.on('update', () => {
          img.style.filter = `brightness(${effectLevelValue.value})`;
        });
  }
};

effectList.addEventListener('change', onEffectChange);

export {initUploadModal};

