const createPatternValidator = (pattern: RegExp, value: string) =>
  pattern.test(value);

export const validateEmail = createPatternValidator.bind(
    this, 
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const validateOnlyLetters = createPatternValidator.bind(
    this, /^[A-Za-z\s]+$/
);

export const validateOnlyNumbers = createPatternValidator.bind(
    this, /^[0-9]+$/
);

export const validateOnlyNumbersAndLetters = createPatternValidator.bind(
    this, /^[,a-zA-Z0-9\s]+$/
);

export const isNotEmpty = (string:string) => {
  return !(string.trim() === '');
};

export const calcStrength = (password:string) => {
  let strengthVal:number = [/[$@!%*#?&]/, /[A-Z]/, /[0-9]/, /[a-z]/]
    .reduce((val, test) => val + (test.test(password) ? 1 : 0), 0);
  if (strengthVal > 2 && password.length > 7) {
    strengthVal++;
    if (strengthVal > 3 && password.length > 9) {
      strengthVal++;
    }
  }
  if (password.length < 6 && strengthVal > 3) {
    strengthVal = 3;
  }
  return strengthVal;
}

export const isNotEmptyEqualStrings = (
    val1?:string|null,
    val2?:string|null):boolean => {
    return !!val1 && !!val2 && val1 === val2;
}