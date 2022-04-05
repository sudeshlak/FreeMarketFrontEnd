export const validateEmail = (email:string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )&& !(email === '');
};
export const validateOnlyLetters = (string:string) => {
  return String(string)
    .toLowerCase()
    .match(
      /^[A-Za-z\s]*$/
    )&&!(string === '');
};

export const validateOnlyNumbers = (string:string) => {
  return String(string)
    .match(
      /^[0-9]*$/
    )&&!(string === '');
};

export const validateOnlyNumbersAndLetters = (string:string) => {
  return String(string)
    .match(
      /^[,a-zA-Z0-9\s]*$/
    )&&!(string === '');;
};

export const isNotEmpty = (string:string) => {
  return !(string === '');
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