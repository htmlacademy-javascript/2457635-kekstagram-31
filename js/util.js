const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';


const showAlert = (errorText) => {
  const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const alertElement = alertTemplate.cloneNode(true);
  const alertElementTitle = alertElement.querySelector('.data-error__title');
  alertElementTitle.textContent = errorText;
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, 5000);
};

let element = null;

const onButtonClick = () => {
  document.body.removeChild(element);
};

const closeModal = () => {
  document.body.removeChild(element);
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onEscKeydown);
};


const onEscKeydown = (e) => {
  if(isEscapeKey(e)){
    e.preventDefault();
    closeModal();
  }
}

function onDocumentClick (evt) {
  if (evt.target === element) {
    closeModal();
};
}

const showModal = (text,cls) => {
  const template = document.querySelector(`#${cls}`).content.querySelector(`.${cls}`);
  element = template.cloneNode(true);

  const titleElement = element.querySelector(`.${cls}__title`);
  const buttonElement = element.querySelector(`.${cls}__button`);

  titleElement.textContent = text;

  buttonElement.addEventListener('click', onButtonClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscKeydown);
  document.body.append(element);

};

export { getRandomInteger, createRandomIdFromRangeGenerator, isEscapeKey, showAlert, showModal };

