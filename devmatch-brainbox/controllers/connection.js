import {
  errorMessages,
  status,
  actionProperties,
  successMessages,
  connectionProperties,
  userProperties,
} from "../config/config.js";
import {
  ConnectionError,
  DatabaseError,
  ValidationError,
} from "../errors/CustomError.js";
import Connection from "../models/connection.js";
import { isValidMongoDbObjectId } from "../utils/authUtils.js";
import { validateAction } from "../validations/validation.js";

export const request = async (req, res) => {
  try {
    const { id } = await req?.data;
    const { action, id: receiverId } = await req?.params;

    if (id === receiverId) {
      throw new ConnectionError(
        status.badRequest,
        errorMessages.SELF_CONNECTION_ERROR,
        { sender: id, receiver: receiverId },
        req?.url
      );
    }

    if (receiverId && !isValidMongoDbObjectId(receiverId)) {
      throw new ValidationError(
        status.badRequest,
        errorMessages.INVALID_USER_ID_FORMAT_ERROR,
        { id: receiverId },
        req?.url
      );
    }

    const validatedAction = validateAction(action);

    if (!validatedAction) {
      throw new ValidationError(
        status.badRequest,
        errorMessages.INVALID_ACTION_ERROR,
        { action },
        req?.url
      );
    }

    const connection = await Connection.findOne({
      $or: [
        { senderId: id, receiverId: receiverId },
        { senderId: receiverId, receiverId: id },
      ],
    })
      .populate({
        path: connectionProperties.SENDER_ID,
        select: userProperties.EMAIL,
      })
      .populate({
        path: connectionProperties.RECEIVER_ID,
        select: userProperties.EMAIL,
      });

    if (connection) {
      if (connection?.action === actionProperties.BLOCKED) {
        throw new ConnectionError(
          status.forbidden,
          errorMessages.BLOCKED_ERROR,
          { connection },
          req?.url
        );
      } else if (connection?.action === actionProperties.PENDING) {
        throw new ConnectionError(
          status.forbidden,
          connection?.senderId === id
            ? errorMessages.PENDING_CONNECTION_FROM_USER_ERROR
            : errorMessages.PENDING_CONNECTION_ON_USER_ERROR,
          { connection },
          req?.url
        );
      } else if (connection?.action === actionProperties.ACCEPTED) {
        throw new ConnectionError(
          status.forbidden,
          errorMessages.CONNECTED_USER_ERROR,
          { connection },
          req?.url
        );
      } else if (connection?.action === actionProperties.REJECTED) {
        if (
          connection?.rejectedCount >= 5 ||
          connection?.rejectedByCount >= 5
        ) {
          throw new ConnectionError(
            status.forbidden,
            errorMessages.BLOCKED_ERROR,
            { connection },
            req?.url
          );
        }
      }
    }

    if (!connection?.senderId?.email || !connection?.receiverId?.email) {
      throw new DatabaseError(
        status.badRequest,
        errorMessages.USER_NOT_EXIST_ERROR,
        {
          sender: connection?.senderId?.email,
          receiver: connection?.receiverId?.email,
        },
        req?.url
      );
    }

    const newConnection = await Connection.create({
      senderId: id,
      receiverId: receiverId,
      action: validatedAction,
    });

    if (!newConnection) {
      throw new ConnectionError(
        status.internalServerError,
        errorMessages.CONNECTION_REQUEST_FAILED_ERROR,
        { connection: newConnection },
        req?.url
      );
    }

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: { newConnection },
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
    const { id } = await req?.data;
    const { action, id: senderId } = await req?.params;

    if (id === senderId) {
      throw new ConnectionError(
        status.badRequest,
        errorMessages.SELF_CONNECTION_ERROR,
        { sender: senderId, receiver: id },
        req?.url
      );
    }

    if (senderId && !isValidMongoDbObjectId(senderId)) {
      throw new DatabaseError(
        status.forbidden,
        errorMessages.INVALID_USER_ID_FORMAT_ERROR,
        { id: senderId },
        req?.url
      );
    }

    const validatedAction = validateAction(action);

    if (!validatedAction) {
      throw new ValidationError(
        status.badRequest,
        errorMessages.INVALID_ACTION_ERROR,
        { action },
        req?.url
      );
    }

    const connection = await Connection.findOne({
      senderId: senderId,
      receiverId: id,
    })
      .populate({
        path: connectionProperties.SENDER_ID,
        select: userProperties.EMAIL,
      })
      .populate({
        path: connectionProperties.RECEIVER_ID,
        select: userProperties.EMAIL,
      });

    if (!connection) {
      throw new ConnectionError(
        status.badRequest,
        errorMessages.INVALID_CONNECTION_REQUEST_ERROR,
        { connection: connection },
        req?.url
      );
    }

    if (!connection?.senderId?.email || !connection?.receiverId?.email) {
      throw new DatabaseError(
        status.badRequest,
        errorMessages.USER_NOT_EXIST_ERROR,
        {
          sender: connection?.senderId?.email,
          receiver: connection?.receiverId?.email,
        },
        req?.url
      );
    }

    const result = await Connection.updateOne(
      { senderId, receiverId: id },
      { validatedAction }
    );

    if (!result || result.matchedCount === 0 || result.modifiedCount === 0) {
      throw new ConnectionError(
        status.internalServerError,
        errorMessages.CONNECTION_REQUEST_FAILED_ERROR,
        { result },
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
