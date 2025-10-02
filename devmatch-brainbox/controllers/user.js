import { status } from "../config/config.js";

export const register = async (req, res) => {
  try {
    console.log("debug req?.data : ", req?.data);

    return res
      .status(200)
      .json({ status: status.success.message, message: "Request received" });
  } catch (error) {
    return res.status(status.failure.statusCode).json({
      status: status.failure.message,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data?.errors,
      },
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log("debug req?.data : ", req?.data);

    return res
      .status(200)
      .json({ status: status.success.message, message: "Request received" });
  } catch (error) {
    return res.status(status.failure.statusCode).json({
      status: status.failure.message,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data?.errors,
      },
    });
  }
};

export const logout = async (req, res) => {
  try {
    console.log("debug req?.data : ", req?.data);

    return res
      .status(200)
      .json({ status: status.success.message, message: "Request received" });
  } catch (error) {
    return res.status(status.failure.statusCode).json({
      status: status.failure.message,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data?.errors,
      },
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    console.log("debug req?.data : ", req?.data);

    return res
      .status(200)
      .json({ status: status.success.message, message: "Request received" });
  } catch (error) {
    return res.status(status.failure.statusCode).json({
      status: status.failure.message,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data?.errors,
      },
    });
  }
};
