import { status } from "../config/config.js";

export const view = async (req, res) => {
  console.log("debug body : ", req.body);
  return res
    .status(200)
    .json({ status: status.success.message, message: "Request received" });
};

export const update = async (req, res) => {
  console.log("debug body : ", req.body);
  return res
    .status(200)
    .json({ status: status.success.message, message: "Request received" });
};

export const updatePassword = async (req, res) => {
  console.log("debug body : ", req.body);
  return res
    .status(200)
    .json({ status: status.success.message, message: "Request received" });
};
