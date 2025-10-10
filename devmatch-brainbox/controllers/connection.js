import {
  connectionProperties,
  connectionStatusProperties,
  errorMessages,
  status,
  successMessages,
  userProperties,
} from "../config/config.js";
import {
  ConnectionError,
  DatabaseError,
  ValidationError,
} from "../errors/CustomError.js";
import Connection from "../models/connection.js";
import User from "../models/user.js";
import { isValidMongoDbObjectId } from "../utils/authUtils.js";
import { validateConnectionStatus } from "../validations/validation.js";

export const connect = async (req, res) => {
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

    const existingOtherUser = await User.findById(otherUserId);

    if (!existingOtherUser) {
      throw new DatabaseError(
        status.badRequest,
        errorMessages.USER_NOT_EXIST_ERROR,
        { id: otherUserId },
        req?.url
      );
    }

    const validatedConnectionStatus =
      validateConnectionStatus(connectionStatus);

    if (!validatedConnectionStatus) {
      throw new ConnectionError(
        status.badRequest,
        errorMessages.INVALID_CONNECTION_STATUS_ERROR,
        { status: connectionStatus },
        req?.url
      );
    }

    const existingConnection = await Connection.findOne({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
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

    let connectionToCreate = { lastActionedBy: userId };
    let connectionToUpdate = { lastActionedBy: userId };

    switch (validatedConnectionStatus) {
      case connectionStatusProperties.INTERESTED:
        if (!existingConnection) {
          connectionToCreate = {
            senderId: userId,
            receiverId: otherUserId,
            connectionStatus: validatedConnectionStatus,
            ...connectionToCreate,
          };
          break;
        }

        if (
          existingConnection?.connectionStatus !== "notInterested" &&
          existingConnection?.connectionStatus !== "rejected"
        ) {
          throw new ConnectionError(
            status.forbidden,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        if (
          existingConnection?.connectionStatus === "rejected" &&
          (existingConnection?.rejectedBySenderCount >= 5 ||
            existingConnection?.rejectedByReceiverCount >= 5)
        ) {
          throw new ConnectionError(
            status.forbidden,
            errorMessages.BLOCKED_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        connectionToUpdate = {
          senderId: existingConnection?.senderId?.id,
          receiverId: existingConnection?.receiverId?.id,
          connectionStatus: validatedConnectionStatus,
          rejectedBySenderCount: 0,
          rejectedByReceiverCount: 0,
          ...connectionToUpdate,
        };
        break;
      case connectionStatusProperties.NOT_INTERESTED:
        if (!existingConnection) {
          connectionToCreate = {
            senderId: userId,
            receiverId: otherUserId,
            connectionStatus: validatedConnectionStatus,
            ...connectionToCreate,
          };

          break;
        }

        if (existingConnection?.connectionStatus === "accepted") {
          throw new ConnectionError(
            status.forbidden,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        if (
          existingConnection?.connectionStatus === "interested" &&
          existingConnection?.lastActionedBy?.toString() === userId
        ) {
          throw new ConnectionError(
            status.forbidden,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        if (
          existingConnection?.connectionStatus === "blocked" &&
          existingConnection?.lastActionedBy?.toString() !== userId
        ) {
          throw new ConnectionError(
            status.forbidden,
            errorMessages.BLOCKED_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        connectionToUpdate = {
          senderId: existingConnection?.senderId?.id,
          receiverId: existingConnection?.receiverId?.id,
          connectionStatus: validatedConnectionStatus,
          ...connectionToUpdate,
        };
        break;

      case connectionStatusProperties.ACCEPTED:
        if (!existingConnection) {
          throw new ConnectionError(
            status.badRequest,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        if (
          existingConnection?.connectionStatus !== "interested" &&
          existingConnection?.lastActionedBy?.toString() !== userId
        ) {
          throw new ConnectionError(
            status.badRequest,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        connectionToUpdate = {
          senderId: existingConnection?.senderId?.id,
          receiverId: existingConnection?.receiverId?.id,
          connectionStatus: validatedConnectionStatus,
          ...connectionToUpdate,
        };
        break;
      case connectionStatusProperties.REJECTED:
        if (!existingConnection) {
          throw new ConnectionError(
            status.badRequest,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        if (
          existingConnection?.connectionStatus !== "interested" &&
          existingConnection?.connectionStatus !== "accepted"
        ) {
          throw new ConnectionError(
            status.badRequest,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        if (
          existingConnection?.connectionStatus === "interested" &&
          existingConnection?.lastActionedBy?.toString() === userId
        ) {
          throw new ConnectionError(
            status.badRequest,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        let rejectedBySenderCount = 0;
        let rejectedByReceiverCount = 0;

        if (existingConnection?.senderId === userId) {
          rejectedBySenderCount = existingConnection?.rejectedBySenderCount + 1;

          if (rejectedBySenderCount >= 5) {
            validatedConnectionStatus = "blocked";
            rejectedBySenderCount = 0;
          }
        } else if (existingConnection?.receiverId === userId) {
          rejectedByReceiverCount =
            existingConnection?.rejectedByReceiverCount + 1;

          if (rejectedByReceiverCount >= 5) {
            validatedConnectionStatus = "blocked";
            rejectedByReceiverCount = 0;
          }
        }

        connectionToUpdate = {
          senderId: existingConnection?.senderId?.id,
          receiverId: existingConnection?.receiverId?.id,
          connectionStatus: validatedConnectionStatus,
          rejectedBySenderCount,
          rejectedByReceiverCount,
          ...connectionToUpdate,
        };
        break;
      case connectionStatusProperties.BLOCKED:
        if (!existingConnection) {
          throw new ConnectionError(
            status.badRequest,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        if (connectionStatus === "blocked") {
          throw new ConnectionError(
            status.badRequest,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        if (connectionStatus === "interested" && lastActionedBy === id) {
          throw new ConnectionError(
            status.badRequest,
            errorMessages.INVALID_CONNECTION_STATUS_ERROR,
            {
              status: connectionStatus,
              existingConnectionStatus: existingConnection?.connectionStatus,
            },
            req?.url
          );
        }

        connectionToUpdate = {
          senderId: existingConnection?.senderId?.id,
          receiverId: existingConnection?.receiverId?.id,
          connectionStatus: validatedConnectionStatus,
          ...connectionToUpdate,
        };
        break;
    }

    console.log(
      "debug from connection controller connectionToCreate : ",
      connectionToCreate
    );
    console.log(
      "debug from connection controller connectionToUpdate : ",
      connectionToUpdate
    );

    const connection = connectionToCreate?.senderId
      ? await Connection.create(connectionToCreate)
      : "Nothing to show yet!";

    console.log("debug from connection controller connection : ", connection);

    if (!connection) {
      throw new ConnectionError(
        status.internalServerError,
        errorMessages.CONNECTION_REQUEST_FAILED_ERROR,
        { connection },
        req?.url
      );
    }

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: { connection },
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
