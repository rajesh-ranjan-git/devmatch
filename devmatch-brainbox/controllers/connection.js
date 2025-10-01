import { status } from "../config/config.js";

export const request = async (req, res) => {
  console.log("debug body : ", req.body);
  return res
    .status(200)
    .json({ status: status.SUCCESS, message: "Request received" });
};

export const view = async (req, res) => {
  console.log("debug body : ", req.body);
  return res
    .status(200)
    .json({ status: status.SUCCESS, message: "Request received" });
};

export const review = async (req, res) => {
  console.log("debug body : ", req.body);
  return res
    .status(200)
    .json({ status: status.SUCCESS, message: "Request received" });
};
