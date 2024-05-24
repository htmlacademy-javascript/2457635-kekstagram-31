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

const isEscapeKey = (evt) => {
return evt.key === 'Escape';
};

// const showAlert = (errorText) => {
//   const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
//   const alertElement = alertTemplate.cloneNode(true);
//   alertElement.textContent = errorText;
//   document.body.append(alertElement);

//   setTimeout(() => {
//     alertElement.remove();
//   }, 5000);
// };

// const onSuccessButtonClick = () => {
//   document.body.removeChild(successElement);
// };

// const closeSuccess = () => {
//   document.body.removeChild(successElement);
//   document.removeEventListener('click', onSuccessDocumentClick);
//   document.removeEventListener('keydown', onSuccessEscKeydown);
// };

// function onSuccessDocumentClick (evt) {
//   if (evt.target === successElement) {
//     closeSuccess();
//   }
// };

// const showSuccess = (successText) => {
//   const successTemplate = document.querySelector('#success').content.querySelector('.success');
//   successElement = successTemplate.cloneNode(true);
//   const successTitleElement = successElement.querySelector('.success__title');
//   const successButtonElement = successElement.querySelector('.success__button');

//   successTitleElement.textContent = successText;

//   successButtonElement.addEventListener('click', onSuccessButtonClick);
//   document.addEventListener('click', onSuccessDocumentClick);
//   document.addEventListener('keydown', onSuccessEscKeydown);
//   document.body.append(successElement);
// };

export { getRandomInteger, createRandomIdFromRangeGenerator, isEscapeKey };
// export { showAlert, showSuccess };
