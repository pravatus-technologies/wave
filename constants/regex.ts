/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const name: RegExp = /[a-zA-Z\ ]{3,15}/;

/*
 * email validation
 */
export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * [0-9a-zA-Z]{6,}: at least 6 from the mentioned characters
 */
export const password: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

/**
 * this regex validates the date to be in the following format YYYY/MM/DD
 * also checks YYYY to be within 0000-9999
 * MM to be within 01-12
 * DD to be within 01-31
 * 
 * but won't validate if the calendar date given is ok. example Feb 30
 */
export const date: RegExp = /^(?:\d{4})\/(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12][0-9]|3[01])$/;
