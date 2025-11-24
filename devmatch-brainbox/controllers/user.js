import {
  defaultUserProperties,
  errorMessages,
  status,
  successMessages,
  userProperties,
} from "../config/config.js";
import { AuthenticationError, DatabaseError } from "../errors/CustomError.js";
import {
  comparePassword,
  getEncryptedPassword,
  getJwtToken,
  isPasswordExpired,
} from "../utils/authUtils.js";
import User from "../models/user.js";
import { selectObjectProperties } from "../utils/utils.js";

export const checkAuth = async (req, res) => {
  try {
    const { user } = req?.data;

    if (!user) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.UNAUTHORIZED_USER_ERROR,
        { user: user },
        req?.url
      );
    }

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      message: successMessages.AUTHENTICATION_SUCCESS,
      user: user,
    });
  } catch (error) {
    return res
      .status(error?.status?.statusCode || status.forbidden.statusCode)
      .json({
        status: error?.status?.message || status.forbidden.message,
        statusCode: error?.status?.statusCode || status.forbidden.statusCode,
        apiUrl: error?.apiUrl || req?.url,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req?.data;

    const existingUser = await User.findOne(
      { userName, email },
      userProperties.ID
    );

    if (existingUser) {
      throw new DatabaseError(
        status.conflict,
        errorMessages.USER_EXISTS_ERROR,
        { existingUserId: existingUser?.id },
        req?.url
      );
    }

    const hashedPassword = await getEncryptedPassword(password);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new DatabaseError(
        status.internalServerError,
        errorMessages.REGISTRATION_FAILED_ERROR,
        { user: newUser },
        req?.url
      );
    }

    const user = selectObjectProperties(
      newUser.toObject(),
      Object.values(defaultUserProperties)
    );

    const token = getJwtToken(user?.id);

    return res
      .status(status.created.statusCode)
      .cookie("authToken", token)
      .json({
        status: status.created.message,
        statusCode: status.created.statusCode,
        message: successMessages.REGISTRATION_SUCCESS,
        user: user,
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
        apiUrl: error?.apiUrl || req?.url,
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
    const { userName, email, password } = req?.data;

    const user = await User.findOne(
      {
        $or: [{ userName }, { email }],
      },
      [
        ...Object.values(defaultUserProperties),
        userProperties.PASSWORD,
        userProperties.PASSWORD_LAST_UPDATED,
      ]
    );

    if (!user) {
      throw new DatabaseError(
        status.notFound,
        errorMessages.USER_NOT_EXIST_ERROR,
        { email },
        req?.url
      );
    }

    const isPasswordCorrect = await comparePassword(password, user?.password);

    if (!isPasswordCorrect) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.INCORRECT_EMAIL_PASSWORD_ERROR,
        { email, password },
        req?.url
      );
    }

    if (isPasswordExpired(user?.passwordLastUpdated)) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.PASSWORD_EXPIRED_ERROR,
        { email, password },
        req?.url
      );
    }

    const token = getJwtToken(user?.id);

    const loggedInUser = selectObjectProperties(
      user.toObject(),
      Object.values(defaultUserProperties)
    );

    return res
      .status(status.success.statusCode)
      .cookie("authToken", token)
      .json({
        status: status.success.message,
        statusCode: status.success.statusCode,
        message: successMessages.LOGIN_SUCCESS,
        user: loggedInUser,
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
        apiUrl: error?.apiUrl || req?.url,
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
    res.clearCookie("authToken");

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      message: successMessages.LOGOUT_SUCCESS,
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
        apiUrl: error?.apiUrl || req?.url,
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
    const { firstName, email, password } = req?.data;

    const user = await User.findOne({ email }, [
      userProperties.ID,
      userProperties.FIRST_NAME,
      userProperties.PASSWORD,
      userProperties.PREVIOUS_PASSWORD,
      userProperties.PASSWORD_LAST_UPDATED,
    ]);

    if (!user) {
      throw new DatabaseError(
        status.notFound,
        errorMessages.USER_NOT_EXIST_ERROR,
        { email },
        req?.url
      );
    }

    if (firstName !== user?.firstName) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.INCORRECT_SECURITY_QUESTION_ANSWER_ERROR,
        { email, firstName },
        req?.url
      );
    }

    const isPasswordAlreadyUsed = await comparePassword(
      password,
      user?.password
    );

    if (isPasswordAlreadyUsed) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.PASSWORD_ALREADY_USED_ERROR,
        { email, password },
        req?.url
      );
    }

    const hashedPassword = await getEncryptedPassword(password);

    const updatedUser = await User.findByIdAndUpdate(user?.id, {
      password: hashedPassword,
      previousPassword: user?.password,
      passwordLastUpdated: Date.now(),
    });

    if (!updatedUser) {
      throw new DatabaseError(
        status.internalServerError,
        errorMessages.PASSWORD_UPDATE_FAILED,
        { email },
        req?.url
      );
    }

    return res.status(status.updated.statusCode).json({
      status: status.updated.message,
      statusCode: status.updated.statusCode,
      message: successMessages.PASSWORD_UPDATE_SUCCESS,
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
        apiUrl: error?.apiUrl || req?.url,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};
