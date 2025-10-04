import {
  allowedPrivateProfileFields,
  allowedPublicProfileFields,
  errorMessages,
  status,
  successMessages,
} from "../config/config.js";
import { AuthenticationError, DatabaseError } from "../errors/CustomError.js";
import User from "../models/user.js";
import { comparePassword, getEncryptedPassword } from "../utils/utils.js";

export const view = async (req, res) => {
  const { id } = await req?.data;
  const { params } = await req?.params;

  const user = await User.findById(
    params?.id ? params?.id : id,
    params?.id ? allowedPublicProfileFields : allowedPrivateProfileFields
  );

  if (!user) {
    throw new DatabaseError(
      status.notFound,
      errorMessages.USER_NOT_EXIST_ERROR,
      { user },
      req?.url
    );
  }

  return res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    data: { user },
    message: successMessages.FETCH_PROFILE_SUCCESS,
  });
};

export const update = async (req, res) => {
  const { id } = await req?.data;
  const body = req?.body;

  // body.map(item => allowedPrivateProfileFields.item ?  )

  // const user = await User.findByIdAndUpdate(id, allowedPrivateProfileFields);

  return res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    message: "Request received",
  });
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = await req?.data;
    const { oldPassword, newPassword } = req?.body;

    const user = await User.findById(
      id,
      "password previousPassword passwordLastUpdated"
    );

    if (!user) {
      throw new DatabaseError(
        status.notFound,
        errorMessages.USER_NOT_EXIST_ERROR,
        { user },
        req?.url
      );
    }

    const isOldPasswordCorrect = await comparePassword(
      oldPassword,
      user?.password
    );

    if (!isOldPasswordCorrect) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.INCORRECT_OLD_PASSWORD_ERROR,
        { password: oldPassword },
        req?.url
      );
    }

    const isPasswordAlreadyUsed = await comparePassword(
      newPassword,
      user?.password
    );

    if (isPasswordAlreadyUsed) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.PASSWORD_ALREADY_USED_ERROR,
        { password: newPassword },
        req?.url
      );
    }

    const hashedPassword = await getEncryptedPassword(newPassword);

    const updatedUser = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
      previousPassword: user?.password,
      passwordLastUpdated: Date.now(),
    });

    if (!updatedUser) {
      throw new DatabaseError(
        status.internalServerError,
        errorMessages.PASSWORD_UPDATE_FAILED,
        { user: updatedUser },
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
        apiUrl: error?.apiUrl,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};
