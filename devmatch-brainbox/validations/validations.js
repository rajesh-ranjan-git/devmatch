import validator from "validator";

const requestValidator = (req, res) => {
  console.log("debug requestValidator req : ", req);
  if (!req || !req?.body) {
    console.log("debug requestValidator err req?.body : ", req?.body);
    throw new Error("INVALID REQUEST");
  }

  console.log("debug requestValidator without err");
  return req?.body;
};

export const loginRequestValidator = (req, res) => {
  const { email, password } = requestValidator(req, res);

  console.log("debug loginRequestValidator");

  if (
    !email ||
    !password ||
    !validator.isEmail(email) ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&]).{6,}$/.test(password)
  ) {
    console.log("debug loginRequestValidator err");
    throw new Error("INVALID EMAIL/PASSWORD");
  }

  console.log("debug loginRequestValidator without err");

  req.data = { email, password };
};
