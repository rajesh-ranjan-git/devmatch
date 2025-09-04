const auth = (req, res, next) => {
  console.log("debug auth middleware");
  next();
};

export default auth;
