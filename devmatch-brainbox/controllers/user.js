import { loginRequestValidator } from "../validations/validations.js";

export const register = async (req, res) => {
  return res.status(200).json({ status: "ok", message: "Request received" });
};

export const login = async (req, res) => {
  try {
    loginRequestValidator(req, res);
    console.log("debug req?.data : ", req?.data);

    return res.status(200).json({ status: "ok", message: "Request received" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).json({ status: "ok", message: "Request received" });
  } catch (error) {
    return res.status(400).json({ error: error, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  return res.status(200).json({ status: "ok", message: "Request received" });
};
