// eslint-disable-next-line no-unused-vars
//задание 1
// eslint-disable-next-line no-unused-vars
function checkLength (string, maxLength) {
  if(string.length <= maxLength) {
  // eslint-disable-next-line indent
return true;
  } else {
  // eslint-disable-next-line indent
return false;
  }
}

// eslint-disable-next-line no-console
console.log(checkLength('проверяемая строка',20));
// eslint-disable-next-line no-console
console.log(checkLength('проверяемая строка',18));
// eslint-disable-next-line no-undef, no-console
console.log(checkLength('проверяемая строка',10));

// Задание 2
// eslint-disable-next-line no-unused-vars
const isPalindrom = function (string) {
  // eslint-disable-next-line prefer-const
  string = (string.replaceAll(' ','')).toLowerCase();
  // eslint-disable-next-line prefer-const
  let testString = '';

  // eslint-disable-next-line no-undef
  for (i = string.length - 1; i >= 0; i--) {
    // eslint-disable-next-line no-undef
    testString += string[i];
  }
  return testString === string;
  // eslint-disable-next-line indent
  // eslint-disable-next-line semi
}

// eslint-disable-next-line no-console
console.log(isPalindrom('топот'));
// eslint-disable-next-line no-console
console.log(isPalindrom('ДовОд'));
// eslint-disable-next-line no-console
console.log(isPalindrom('Кекс'));
