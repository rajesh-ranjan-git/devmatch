import { status } from "../config/config.js";

export const register = async (req, res) => {
  try {
    console.log("debug req?.data : ", req?.data);

    return res
      .status(200)
      .json({ status: status.SUCCESS, message: "Request received" });
  } catch (error) {
    return res.status(400).json({
      status: status.FAILURE,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data.errors,
      },
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log("debug req?.data : ", req?.data);

    return res
      .status(200)
      .json({ status: status.SUCCESS, message: "Request received" });
  } catch (error) {
    return res.status(400).json({
      status: status.FAILURE,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data.errors,
      },
    });
  }
};

export const logout = async (req, res) => {
  try {
    console.log("debug req?.data : ", req?.data);

    return res
      .status(200)
      .json({ status: status.SUCCESS, message: "Request received" });
  } catch (error) {
    return res.status(400).json({
      status: status.FAILURE,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data.errors,
      },
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    console.log("debug req?.data : ", req?.data);

    return res
      .status(200)
      .json({ status: status.SUCCESS, message: "Request received" });
  } catch (error) {
    return res.status(400).json({
      status: status.FAILURE,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data.errors,
      },
    });
  }
};
