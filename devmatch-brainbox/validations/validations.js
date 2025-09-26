import validator from "validator";

const requestValidator = (req, res) => {
  if (!req || !req?.body) {
    throw new Error("INVALID REQUEST");
  }

  return req?.body;
};

export const loginRequestValidator = (req, res) => {
  const { email, password } = requestValidator(req, res);

  if (
    !email ||
    !password ||
    !validator.isEmail(email) ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&]).{6,}$/.test(password)
  ) {
    throw new Error("INVALID EMAIL/PASSWORD");
  }

  req.data = { email, password };
};
