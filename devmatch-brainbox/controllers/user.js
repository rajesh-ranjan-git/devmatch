import { errorMessages, status, successMessages } from "../config/config.js";
import { DatabaseError } from "../errors/CustomError.js";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { firstName, email, password } = req?.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new DatabaseError(
        status.conflict,
        errorMessages.USER_EXISTS_ERROR,
        existingUser,
        req?.url
      );
    }

    const user = new User({
      firstName,
      email,
      password,
    });

    if (!user) {
      throw new DatabaseError(
        status.internalServerError,
        errorMessages.REGISTRATION_FAILED_ERROR,
        user,
        req?.url
      );
    }

    user.save();

    return res.status(status.created.statusCode).json({
      status: status.created.message,
      statusCode: status.created.statusCode,
      message: successMessages.REGISTRATION_SUCCESS,
      newUser: user,
    });
  } catch (error) {
    return res
      .status(error.status.statusCode || status.internalServerError.statusCode)
      .json({
        status: error.status.message || status.internalServerError.message,
        statusCode:
          error.status.statusCode || status.internalServerError.statusCode,
        apiURL: error?.apiURL,
        error: {
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

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      message: "Request received",
    });
  } catch (error) {
    return res
      .status(error.status.statusCode || status.internalServerError.statusCode)
      .json({
        status: error.status.message || status.internalServerError.message,
        statusCode:
          error.status.statusCode || status.internalServerError.statusCode,
        apiURL: error?.apiURL,
        error: {
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

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      message: "Request received",
    });
  } catch (error) {
    return res.status(status.internalServerError.statusCode).json({
      status: status.internalServerError.message,
      statusCode: status.internalServerError.statusCode,
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

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      message: "Request received",
    });
  } catch (error) {
    return res.status(status.internalServerError.statusCode).json({
      status: status.internalServerError.message,
      statusCode: status.internalServerError.statusCode,
      error: {
        apiURL: error?.apiURL,
        type: error?.type,
        message: error?.message,
        data: error?.data?.errors,
      },
    });
  }
};
