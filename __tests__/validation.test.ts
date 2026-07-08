import { calcStrength, isNotEmpty, validateEmail, validateOnlyLetters, validateOnlyNumbers, validateOnlyNumbersAndLetters} from "../src/components/shoppingFormArea/validations";

describe("validation", () => {
  it("Is valid email", () => {
    expect(validateEmail("test_123@test.co.com")).toBeTruthy();
    expect(validateEmail("")).toBeFalsy();
    expect(validateEmail(" not$a😐email")).toBeFalsy();
  });

  it("Is valid only letters", () => {
    expect(validateOnlyLetters("Helloworld")).toBeTruthy();
    expect(validateOnlyLetters("")).toBeFalsy();
    expect(validateOnlyLetters("1234567890")).toBeFalsy();
    expect(validateOnlyLetters(" not$letters😐")).toBeFalsy();
  });

  it("Is valid only numbers", () => {
    expect(validateOnlyNumbers("1234567890")).toBeTruthy();
    expect(validateOnlyNumbers("")).toBeFalsy();
    expect(validateOnlyNumbers("0.01")).toBeFalsy();
    expect(validateOnlyNumbers(" not$numbers😐")).toBeFalsy();
  });

  it("Is valid only numbers and letters", () => {
    expect(validateOnlyNumbersAndLetters("HelloWorld1234567890")).toBeTruthy();
    expect(validateOnlyNumbersAndLetters("")).toBeFalsy();
    expect(validateOnlyNumbersAndLetters("0.01")).toBeFalsy();
    expect(validateOnlyNumbersAndLetters(" not$numbersandletters😐")).toBeFalsy();
  });

  it("Is not empty", () => {
    expect(isNotEmpty("")).toBeFalsy();
    expect(isNotEmpty("  ")).toBeFalsy();
  });

  it("Calculate strength of password", () => {
    expect(calcStrength(" ")).toBe(0);
    expect(calcStrength("1")).toBe(1);
    expect(calcStrength("1@Aa")).toBe(3);
    expect(calcStrength("$9N$T9#J")).toBe(4);
    expect(calcStrength("*Ga3&Rs6(H")).toBe(6);
  });

});