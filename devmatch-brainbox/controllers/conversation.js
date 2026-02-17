import {
  defaultUserProperties,
  errorMessages,
  status,
  successMessages,
} from "../config/config.js";
import { ValidationError } from "../errors/CustomError.js";
import Conversation from "../models/conversation.js";
import { isValidMongoDbObjectId } from "../utils/authUtils.js";
import { sanitizeMongoData } from "../utils/utils.js";
import { limitValidator, pageValidator } from "../validations/validation.js";

export const chats = async (req, res) => {
  try {
    const { id: loggedInUserId } = req?.data;
    const { page, limit } = await req?.query;

    const validatedPage = pageValidator(page);

    const validatedLimit = limitValidator(limit);

    let conversations = await Conversation.find({
      participants: loggedInUserId,
    })
      .populate({
        path: "participants",
        select: Object.values(defaultUserProperties),
      })
      .skip(((validatedPage || 1) - 1) * (validatedLimit || 10))
      .limit(validatedLimit || 10);

    const sanitizedConversation = sanitizeMongoData(conversations);

    const totalCount = await Conversation.countDocuments({
      participants: [loggedInUserId, otherUserId],
    });

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: {
        conversation: sanitizedConversation,
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
      message: successMessages.FETCH_MESSAGES_SUCCESS,
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

export const chatMessages = async (req, res) => {
  try {
    const { id: otherUserId } = await req?.params;

    const { id: loggedInUserId } = req?.data;

    if (otherUserId && !isValidMongoDbObjectId(otherUserId)) {
      throw new ValidationError(
        status.forbidden,
        errorMessages.INVALID_NOTIFICATION_ID_FORMAT_ERROR,
        { otherUserId },
        req?.url,
      );
    }

    const { page, limit } = await req?.query;

    const validatedPage = pageValidator(page);

    const validatedLimit = limitValidator(limit);

    let conversation = await Conversation.find({
      participants: { $all: [loggedInUserId, otherUserId] },
    })
      .populate({
        path: "messages",
        populate: {
          path: "senderId",
          select: Object.values(defaultUserProperties),
        },
      })
      .skip(((validatedPage || 1) - 1) * (validatedLimit || 10))
      .limit(validatedLimit || 10);

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [loggedInUserId, otherUserId],
      });
    } else {
    }

    const sanitizedConversation = sanitizeMongoData(conversation);

    const totalCount = await Conversation.countDocuments({
      participants: [loggedInUserId, otherUserId],
    });

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: {
        conversation: sanitizedConversation,
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
      message: successMessages.FETCH_MESSAGES_SUCCESS,
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

export const groupChatMessages = async (req, res) => {
  try {
    const { id: otherUserId } = await req?.params;

    const { id: loggedInUserId } = req?.data;

    if (otherUserId && !isValidMongoDbObjectId(otherUserId)) {
      throw new ValidationError(
        status.forbidden,
        errorMessages.INVALID_NOTIFICATION_ID_FORMAT_ERROR,
        { otherUserId },
        req?.url,
      );
    }

    const { page, limit } = await req?.query;

    const validatedPage = pageValidator(page);

    const validatedLimit = limitValidator(limit);

    let conversation = await Conversation.find({
      participants: { $all: [loggedInUserId, otherUserId] },
    })
      .populate({
        path: "messages",
        populate: {
          path: "senderId",
          select: Object.values(defaultUserProperties),
        },
      })
      .skip(((validatedPage || 1) - 1) * (validatedLimit || 10))
      .limit(validatedLimit || 10);

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [loggedInUserId, otherUserId],
      });
    } else {
    }

    const sanitizedConversation = sanitizeMongoData(conversation);

    const totalCount = await Conversation.countDocuments({
      participants: [loggedInUserId, otherUserId],
    });

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: {
        conversation: sanitizedConversation,
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
      message: successMessages.FETCH_MESSAGES_SUCCESS,
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
