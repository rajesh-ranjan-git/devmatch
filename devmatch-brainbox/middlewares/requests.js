import validator from "validator";

const requestValidator = (req, res) => {
  if (!req || !req?.body || !Object.keys(req?.body).length) {
    throw new Error("Invalid Request!");
  }

  return req?.body;
};

export const registerRequestValidator = (req, res, next) => {
  try {
    const { firstName, email, password } = requestValidator(req, res);

    if (!firstName) {
      throw new Error("First Name is required!");
    }

    if (!email) {
      throw new Error("Email is required!");
    }

    if (!password) {
      throw new Error("Password is required!");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email!");
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&]).{6,}$/.test(password)) {
      throw new Error(
        "Password must be at least 6 characters long and must include at least an uppercase letter, a lowercase letter, a number and a special character (@, #, $, %, &)."
      );
    }

    req.data = { email, password };

    next();
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const loginRequestValidator = (req, res, next) => {
  try {
    const { email, password } = requestValidator(req, res);

    if (!email) {
      throw new Error("Email is required!");
    }

    if (!password) {
      throw new Error("Password is required!");
    }

    if (
      !validator.isEmail(email) ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&]).{6,}$/.test(password)
    ) {
      throw new Error("Invalid email / password combination!");
    }

    req.data = { email, password };
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }

  next();
};
