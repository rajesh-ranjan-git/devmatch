import {
  connectionProperties,
  connectionStatusProperties,
  publicProfilePropertiesForExplore,
  status,
  successMessages,
} from "../config/config.js";
import { DatabaseError } from "../errors/CustomError.js";
import Connection from "../models/connection.js";
import User from "../models/user.js";
import { limitValidator, pageValidator } from "../validations/validation.js";

export const explore = async (req, res) => {
  try {
    const { id } = await req?.data;
    const { page, limit } = await req?.query;

    const validatedPage = pageValidator(page);

    const validatedLimit = limitValidator(limit);

    const connections = await Connection.find({
      $and: [
        {
          $or: [{ senderId: id }, { receiverId: id }],
        },
        {
          connectionStatus: [
            connectionStatusProperties.ACCEPTED,
            connectionStatusProperties.BLOCKED,
          ],
        },
      ],
    }).select([
      connectionProperties.SENDER_ID,
      connectionProperties.RECEIVER_ID,
      connectionProperties.CONNECTION_STATUS,
      connectionProperties.UPDATED_AT,
    ]);

    const acceptedOrBlockedUsers = connections.map((user) =>
      user?.senderId?.toString()
    );

    acceptedOrBlockedUsers.push(id);

    const users = await User.find({
      _id: { $nin: Array.from(acceptedOrBlockedUsers) },
    }).select(publicProfilePropertiesForExplore);

    const totalCount = users?.length;

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: {
        users,
        pagination: {
          total: totalCount || "",
          page: validatedPage || "",
          limit: validatedLimit || "",
          totalPages:
            totalCount && validatedLimit
              ? Math.ceil(totalCount / validatedLimit)
              : "",
        },
      },
      message: successMessages.EXPLORE_DATA_FETCH_SUCCESS,
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
