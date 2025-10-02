import { status } from "../config/config.js";

export const explore = async (req, res) => {
  console.log("debug body : ", req.body);
  return res
    .status(200)
    .json({ status: status.success.message, message: "Request received" });
};
