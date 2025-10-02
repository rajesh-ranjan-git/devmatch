import { errorMessages, status, successMessages } from "../config/config.js";
import { DatabaseError } from "../errors/CustomError.js";
import { getEncryptedPassword, getJwtToken } from "../utils/utils.js";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { firstName, email, password } = req?.data;

    const existingUser = await User.findOne({ email }, "_id");

    if (existingUser) {
      throw new DatabaseError(
        status.conflict,
        errorMessages.USER_EXISTS_ERROR,
        { existingUserId: existingUser?.id },
        req?.url
      );
    }

    const hashedPassword = await getEncryptedPassword(password);

    const user = new User({
      firstName,
      email,
      password: hashedPassword,
    });

    user.save();

    const registeredUser = await User.findOne({ email }, "_id");

    if (!registeredUser) {
      throw new DatabaseError(
        status.internalServerError,
        errorMessages.REGISTRATION_FAILED_ERROR,
        { user },
        req?.url
      );
    }

    const token = getJwtToken(registeredUser?.id);

    return res
      .status(status.created.statusCode)
      .cookie("authToken", token)
      .json({
        status: status.created.message,
        statusCode: status.created.statusCode,
        message: successMessages.REGISTRATION_SUCCESS,
        newUserId: registeredUser?.id,
      });
  } catch (error) {
    return res
      .status(
        error?.status?.statusCode || status.internalServerError.statusCode
      )
      .json({
        status: error?.status?.message || status.internalServerError.message,
        statusCode:
          error?.status?.statusCode || status.internalServerError.statusCode,
        apiUrl: error?.apiUrl,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
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
      .status(
        error?.status?.statusCode || status.internalServerError.statusCode
      )
      .json({
        status: error?.status?.message || status.internalServerError.message,
        statusCode:
          error?.status?.statusCode || status.internalServerError.statusCode,
        apiUrl: error?.apiUrl,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
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
    return res
      .status(
        error?.status?.statusCode || status.internalServerError.statusCode
      )
      .json({
        status: error?.status?.statusCode || status.internalServerError.message,
        statusCode:
          error?.status?.statusCode || status.internalServerError.statusCode,
        apiUrl: error?.apiUrl,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
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
    return res
      .status(
        error?.status?.statusCode || status.internalServerError.statusCode
      )
      .json({
        status: error?.status?.message || status.internalServerError.message,
        statusCode:
          error?.status?.statusCode || status.internalServerError.statusCode,
        apiUrl: error?.apiUrl,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};
