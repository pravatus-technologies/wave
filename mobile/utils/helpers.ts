import * as regex from "@constants/regex";

export const isValidDateFormat = (dateStr: string): boolean =>
  regex.date.test(dateStr);

export const isOfLegalAge = (birthdayStr: string, legalAge = 18): boolean => {
  if (!isValidDateFormat(birthdayStr)) return false;

  const [year, month, day] = birthdayStr.split("/").map(Number);
  const birthday = new Date(year, month - 1, day);

  if (isNaN(birthday.getTime())) return false; // invalid actual date (e.g. 2023/02/31)

  const today = new Date();
  const age =
    today.getFullYear() -
    birthday.getFullYear() -
    (today < new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate()) ? 1 : 0);

  return age >= legalAge;
};