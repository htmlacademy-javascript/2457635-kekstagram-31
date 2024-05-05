const uploadForm = document.querySelector('.img-upload__form');
const effectList = uploadForm.querySelector('.effects__list');
const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const slider = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
const imgPreview = imgUploadWrapper.querySelector('.img-upload__preview');

const EFFECTS = [
  {
    name: 'none',
    style: '',
    min: 0,
    max: 1,
    start: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 100,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    start: 100,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    start: 100,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    start: 100,
    step: 0.1,
    unit: ''
  },
];

let currentEffect = EFFECTS[0];

noUiSlider.create(slider, {
  start: currentEffect.max,
  connect: 'lower',
  range: {
<<<<<<< HEAD
    min: currentEffect.min,
    max: currentEffect.max,
  },
=======
    min: 0,
    max: 1,
  }
>>>>>>> 5838d3d115d2780100ac15154912f323e614f769
});

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
});

const hideEffectSlider = () => {
  effectLevel.classList.add('hidden');
};

const showEffectSlider = () => {
  effectLevel.classList.remove('hidden');
};

const updateEffectSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.start,
    step: currentEffect.step,
  });
  slider.noUiSlider.on('update', () => {
    imgPreview.style.filter = `${currentEffect.style}(${effectLevelValue.value}${currentEffect.unit})`;
  });
};

const onEffectListChange = (evt) => {
  const effect = evt.target.value;

<<<<<<< HEAD
  if (effect === 'none') {
    hideEffectSlider();
    resetEffectSlider();
  } else {
    showEffectSlider();
  }

  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imgPreview.className = `img-upload__preview effects__preview--${currentEffect.name}`;
  updateEffectSlider();
};

const resetEffectSlider = () => {
  imgPreview.className = 'img-upload__preview';
  imgPreview.style = 'none';
  effectLevelValue.value = 0;
};

hideEffectSlider();
=======
        case 'sepia':
          slider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
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
              min: 0,
              max: 100,
            },
            start: 0,
            step: 1,
          });
          slider.noUiSlider.on('update', () => {
            img.style.filter = `invert(${effectLevelValue.value}%)`;
          });
          break;

        case 'phobos':
          slider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
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
              min: 1,
              max: 3,
            },
            start: 1,
            step: 0.1,
          });
          slider.noUiSlider.on('update', () => {
            img.style.filter = `brightness(${effectLevelValue.value})`;
          });
    }
  };
>>>>>>> 5838d3d115d2780100ac15154912f323e614f769

effectList.addEventListener('change', onEffectListChange);
