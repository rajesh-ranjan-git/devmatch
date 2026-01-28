import {
  privateProfileProperties,
  publicProfileProperties,
  errorMessages,
  status,
  successMessages,
  userProperties,
  allowedUpdateProfileProperties,
} from "../config/config.js";
import { AuthenticationError, DatabaseError } from "../errors/CustomError.js";
import {
  comparePassword,
  getEncryptedPassword,
  isValidMongoDbObjectId,
} from "../utils/authUtils.js";
import {
  deepEquals,
  sanitizeMongoData,
  validatePropertiesToUpdate,
} from "../utils/utils.js";
import User from "../models/user.js";

export const view = async (req, res) => {
  try {
    const { id } = await req?.data;
    const params = await req?.params;

    if (params?.id && !isValidMongoDbObjectId(params?.id)) {
      throw new DatabaseError(
        status.forbidden,
        errorMessages.INVALID_USER_ID_FORMAT_ERROR,
        { id: params?.id },
        req?.url,
      );
    }

    const user = await User.findById(
      params?.id ? params?.id : id,
      !params?.id
        ? Object.values(privateProfileProperties)
        : params?.id === id
          ? Object.values(privateProfileProperties)
          : Object.values(publicProfileProperties),
    );

    if (!user) {
      throw new DatabaseError(
        status.notFound,
        errorMessages.USER_NOT_EXIST_ERROR,
        { user },
        req?.url,
      );
    }

    const sanitizedUser = sanitizeMongoData(user);

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      user: sanitizedUser,
      message: successMessages.FETCH_PROFILE_SUCCESS,
    });
  } catch (error) {
    return res
      .status(
        error?.status?.statusCode || status.internalServerError.statusCode,
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

export const update = async (req, res) => {
  try {
    const { id, ...properties } = await req?.data;

    const validatedProperties = validatePropertiesToUpdate(properties);

    const user = await User.findById(id).select(
      Object.values(privateProfileProperties).join(" "),
    );

    if (!user) {
      throw new DatabaseError(
        status.internalServerError,
        errorMessages.USER_UPDATE_FAILED_ERROR,
        { user },
        req?.url,
      );
    }

    const validatedPropertiesToUpdate = Object.values(
      allowedUpdateProfileProperties,
    ).filter(
      (value) =>
        !deepEquals(validatedProperties[value], user[value]) &&
        value !== userProperties.COVER_PHOTO_URL &&
        value !== userProperties.AVATAR_URL,
    );

    if (validatedPropertiesToUpdate.length <= 0) {
      return res.status(status.conflict.statusCode).json({
        status: status.conflict.message,
        statusCode: status.conflict.statusCode,
        user: sanitizeMongoData(user),
        message: errorMessages.INVALID_PROFILE_UPDATE_ERROR,
      });
    }

    const finalPropertiesToUpdate = validatedPropertiesToUpdate.reduce(
      (acc, curr) => {
        acc[curr] = validatedProperties[curr];
        return acc;
      },
      {},
    );

    const updatedUser = await User.findByIdAndUpdate(
      id,
      finalPropertiesToUpdate,
      {
        new: true,
        select: Object.values(privateProfileProperties).join(" "),
      },
    );

    if (!updatedUser) {
      throw new DatabaseError(
        status.internalServerError,
        errorMessages.USER_UPDATE_FAILED_ERROR,
        { user: updatedUser },
        req?.url,
      );
    }

    const sanitizedUser = sanitizeMongoData(updatedUser);

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      user: sanitizedUser,
      message: successMessages.USER_UPDATE_SUCCESS,
    });
  } catch (error) {
    return res
      .status(
        error?.status?.statusCode || status.internalServerError.statusCode,
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

export const updatePassword = async (req, res) => {
  try {
    const { id } = await req?.data;
    const { oldPassword, newPassword } = req?.body;

    const user = await User.findById(id, [
      userProperties.PASSWORD,
      userProperties.PREVIOUS_PASSWORD,
      userProperties.PASSWORD_LAST_UPDATED,
    ]);

    if (!user) {
      throw new DatabaseError(
        status.notFound,
        errorMessages.USER_NOT_EXIST_ERROR,
        { user },
        req?.url,
      );
    }

    const isOldPasswordCorrect = await comparePassword(
      oldPassword,
      user?.password,
    );

    if (!isOldPasswordCorrect) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.INCORRECT_OLD_PASSWORD_ERROR,
        { password: oldPassword },
        req?.url,
      );
    }

    const isPasswordAlreadyUsed = await comparePassword(
      newPassword,
      user?.previousPassword,
    );

    if (isPasswordAlreadyUsed) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.PASSWORD_ALREADY_USED_ERROR,
        { password: newPassword },
        req?.url,
      );
    }

    const hashedPassword = await getEncryptedPassword(newPassword);

    const updatedUser = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
      previousPassword: user?.password,
      passwordLastUpdated: Date.now(),
    });

    const sanitizedUser = sanitizeMongoData(updatedUser);

    if (!updatedUser) {
      throw new DatabaseError(
        status.internalServerError,
        errorMessages.PASSWORD_UPDATE_FAILED_ERROR,
        { user: sanitizedUser },
        req?.url,
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
        error?.status?.statusCode || status.internalServerError.statusCode,
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
