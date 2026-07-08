export const validateEmail = (email: string): boolean => {
    const regEx:RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email.trim());
};

export const validateOnlyLetters = (string:string):boolean => {
    const regEx:RegExp = /^[A-Za-z\s]+$/;
    return regEx.test(string.trim());
};

export const validateOnlyNumbers = (string:string) => {
    const regEx:RegExp = /^[0-9]+$/;
    return regEx.test(string.trim());
};

export const validateOnlyNumbersAndLetters = (string:string) => {
  const regEx:RegExp = /^[,a-zA-Z0-9\s]+$/;
  return regEx.test(string.trim());
};

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