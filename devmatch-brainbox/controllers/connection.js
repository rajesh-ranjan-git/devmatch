import { errorMessages, status, successMessages } from "../config/config.js";
import {
  ConnectionError,
  DatabaseError,
  ValidationError,
} from "../errors/CustomError.js";
import { isValidMongoDbObjectId } from "../utils/authUtils.js";

export const request = async (req, res) => {
  try {
    const { id: userId } = await req?.data;
    const { status: connectionStatus, id: otherUserId } = await req?.params;

    if (userId === otherUserId) {
      throw new ConnectionError(
        status.badRequest,
        errorMessages.SELF_CONNECTION_ERROR,
        { sender: userId, receiver: otherUserId },
        req?.url
      );
    }

    if (otherUserId && !isValidMongoDbObjectId(otherUserId)) {
      throw new ValidationError(
        status.badRequest,
        errorMessages.INVALID_USER_ID_FORMAT_ERROR,
        { id: otherUserId },
        req?.url
      );
    }

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: {},
      message: successMessages.CONNECTION_REQUEST_SUCCESS,
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

export const review = async (req, res) => {
  try {
    const { id: userId } = await req?.data;
    const { status: connectionStatus, id: otherUserId } = await req?.params;

    if (userId === otherUserId) {
      throw new ConnectionError(
        status.badRequest,
        errorMessages.SELF_CONNECTION_ERROR,
        { sender: otherUserId, receiver: userId },
        req?.url
      );
    }

    if (otherUserId && !isValidMongoDbObjectId(otherUserId)) {
      throw new DatabaseError(
        status.forbidden,
        errorMessages.INVALID_USER_ID_FORMAT_ERROR,
        { id: otherUserId },
        req?.url
      );
    }

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: { connection: { action: validatedAction, ...connection } },
      message: successMessages.CONNECTION_REVIEW_SUCCESS,
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
