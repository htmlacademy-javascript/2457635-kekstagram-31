const uploadForm = document.querySelector('.img-upload__form');

const imgPreview = uploadForm.querySelector('.img-upload__preview img');
const smaller = uploadForm.querySelector('.scale__control--smaller');
const bigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControl = uploadForm.querySelector('.scale__control--value');

const SCALE_STEP = 0.25;


let scale = 1;

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    imgPreview.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;

  }
};

const onBiggerClick = () => {
  if (scale < 1) {
    imgPreview.style.transform = `scale(${scale += SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;

  }
};

bigger.addEventListener('click', onBiggerClick);
smaller.addEventListener('click', onSmallerClick);
