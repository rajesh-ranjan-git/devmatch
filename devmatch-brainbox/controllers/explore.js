import { status } from "../config/config.js";

export const explore = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    message: "Request received",
  });
};
