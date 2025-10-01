const auth = (req, res, next) => {
  const body = requestValidator(req, res);

  console.log("debug auth middleware body : ", body);

  next();
};

export default auth;
