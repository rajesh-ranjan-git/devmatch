export const register = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(200).json({ status: "ok", message: "Request received" });
};

export const login = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(200).json({ status: "ok", message: "Request received" });
};

export const logout = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(200).json({ status: "ok", message: "Request received" });
};

export const forgotPassword = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(200).json({ status: "ok", message: "Request received" });
};
