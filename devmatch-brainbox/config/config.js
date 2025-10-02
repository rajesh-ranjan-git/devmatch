export const status = {
  success: { message: "ok", statusCode: 200 },
  failure: {
    message: "fail",
    statusCode: 400,
  },
};

export const FIRST_NAME_REGEX = /^[A-Za-z]+$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const UPPER_CASE_REGEX = /[A-Z]/;
export const LOWER_CASE_REGEX = /[a-z]/;
export const NUMBER_REGEX = /\d/;
export const ALLOWED_SPECIAL_CHARACTERS_REGEX = /[@#$%&]/;
