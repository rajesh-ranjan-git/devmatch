import { loginRequestValidator } from "../validations/validations.js";

export const register = async (req, res) => {
  return res.status(200).json({ status: "ok", message: "Request received" });
};

export const login = async (req, res) => {
  try {
    const data = loginRequestValidator(req, res);

    console.log("debug req : ", req);
    console.log("debug req.body : ", req.body);
    console.log("debug data : ", data);

    return res.status(200).json({ status: "ok", message: "Request received" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const data = req?.data;

    console.log("debug req : ", req);
    console.log("debug data : ", data);

    return res.status(200).json({ status: "ok", message: "Request received" });
  } catch (error) {
    return res.status(400).json({ error: error, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(200).json({ status: "ok", message: "Request received" });
};
