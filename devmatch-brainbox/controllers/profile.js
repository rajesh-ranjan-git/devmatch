export const view = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(200).json({ status: "ok", message: "Request received" });
};

export const update = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(200).json({ status: "ok", message: "Request received" });
};

export const updatePassword = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(200).json({ status: "ok", message: "Request received" });
};

export const forgotPassword = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(200).json({ status: "ok", message: "Request received" });
};
