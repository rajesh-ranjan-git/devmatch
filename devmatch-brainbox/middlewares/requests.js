import validator from "validator";

const requestValidator = (req, res) => {
  try {
    if (!req || !req?.body) {
      throw new Error("Invalid Request!");
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", error: error.message });
  }

  return req?.body;
};

export const registerRequestValidator = (req, res, next) => {
  const { firstName, email, password } = requestValidator(req, res);

  try {
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
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }

  next();
};

export const loginRequestValidator = (req, res, next) => {
  const { email, password } = requestValidator(req, res);

  try {
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
