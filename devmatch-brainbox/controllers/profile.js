import { status } from "../config/config.js";

export const view = async (req, res) => {
  const { firstName, id } = req?.data;

  return res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    data: { user: { firstName, id } },
    message: "View Profile!",
  });
};

export const update = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    message: "Request received",
  });
};

export const updatePassword = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    message: "Request received",
  });
};
