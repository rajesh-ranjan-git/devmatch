import {
  connectionStatusProperties,
  defaultUserProperties,
  errorMessages,
  status,
  successMessages,
} from "../config/config.js";
import { ForbiddenError, ValidationError } from "../errors/CustomError.js";
import Connection from "../models/connection.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { isValidMongoDbObjectId } from "../utils/authUtils.js";
import {
  buildPagination,
  sendErrorResponse,
  sanitizeMongoData,
  sendSuccessResponse,
} from "../utils/utils.js";
import { limitValidator, pageValidator } from "../validations/validation.js";

export const chats = async (req, res) => {
  try {
    const { id: loggedInUserId } = req?.data;
    const { page, limit } = await req?.query;

    const validatedPage = pageValidator(page);
    const validatedLimit = limitValidator(limit);
    const skip = ((validatedPage || 1) - 1) * (validatedLimit || 10);

    const [conversations, totalCount] = await Promise.all([
      Conversation.find({
        participants: loggedInUserId,
        isGroup: false,
      })
        .populate({
          path: "participants",
          select: Object.values(defaultUserProperties),
        })
        .populate({
          path: "messages",
          options: { sort: { createdAt: -1 }, limit: 1 },
          populate: {
            path: "senderId",
            select: Object.values(defaultUserProperties),
          },
        })
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(validatedLimit || 10),

      Conversation.countDocuments({
        participants: loggedInUserId,
        isGroup: false,
      }),
    ]);

    const sanitizedConversations = sanitizeMongoData(conversations).map(
      (conversation) => ({
        ...conversation,
        otherParticipant: conversation.participants.find(
          (p) => String(p.id) !== String(loggedInUserId),
        ),
        latestMessage: conversation.messages?.[0] || null,
        messages: undefined,
      }),
    );

    return sendSuccessResponse(
      res,
      {
        conversations: sanitizedConversations,
        pagination: buildPagination(totalCount, validatedPage, validatedLimit),
      },
      successMessages.FETCH_CHATS_SUCCESS,
    );
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
};

export const chatMessages = async (req, res) => {
  try {
    const { id: otherUserId } = await req?.params;
    const { id: loggedInUserId } = req?.data;

    if (otherUserId && !isValidMongoDbObjectId(otherUserId)) {
      throw new ValidationError(
        status.forbidden,
        errorMessages.INVALID_USER_ID_FORMAT_ERROR,
        { otherUserId },
        req?.url,
      );
    }

    const existingConnection = await Connection.find({
      $and: [
        {
          $or: [
            { senderId: loggedInUserId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: loggedInUserId },
          ],
        },
        {
          connectionStatus: connectionStatusProperties.ACCEPTED,
        },
      ],
    });

    if (!existingConnection) {
      throw new ForbiddenError(
        status.forbidden,
        errorMessages.USER_NOT_CONNECTED_ERROR,
        { otherUserId },
        req?.url,
      );
    }

    const { page, limit } = await req?.query;
    const validatedPage = pageValidator(page);
    const validatedLimit = limitValidator(limit);
    const skip = ((validatedPage || 1) - 1) * (validatedLimit || 10);

    const conversation = await Conversation.findOne({
      participants: { $all: [loggedInUserId, otherUserId] },
      isGroup: false,
    }).lean();

    if (!conversation) {
      return sendSuccessResponse(
        res,
        {
          conversation: null,
          messages: [],
          pagination: buildPagination(0, validatedPage, validatedLimit),
        },
        successMessages.FETCH_CHAT_MESSAGES_SUCCESS,
      );
    }

    const sanitizedConversation = sanitizeMongoData(conversation);

    const [messages, totalMessageCount] = await Promise.all([
      Message.find({ conversationId: sanitizedConversation.id })
        .populate("senderId", Object.values(defaultUserProperties))
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(validatedLimit || 10),

      Message.countDocuments({ conversationId: conversation._id }),
    ]);

    return sendSuccessResponse(
      res,
      {
        conversation: sanitizedConversation,
        messages: sanitizeMongoData(messages),
        pagination: buildPagination(
          totalMessageCount,
          validatedPage,
          validatedLimit,
        ),
      },
      successMessages.FETCH_CHAT_MESSAGES_SUCCESS,
    );
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
};

export const groupChats = async (req, res) => {
  try {
    const { id: loggedInUserId } = req?.data;
    const { page, limit } = req?.query;

    const validatedPage = pageValidator(page);
    const validatedLimit = limitValidator(limit);
    const skip = ((validatedPage || 1) - 1) * (validatedLimit || 10);

    const [conversations, totalCount] = await Promise.all([
      Conversation.find({
        participants: loggedInUserId,
        isGroup: true,
      })
        .populate({
          path: "participants",
          select: Object.values(defaultUserProperties),
        })
        .populate({
          path: "messages",
          options: { sort: { createdAt: -1 }, limit: 1 },
          populate: {
            path: "senderId",
            select: Object.values(defaultUserProperties),
          },
        })
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(validatedLimit || 10),

      Conversation.countDocuments({
        participants: loggedInUserId,
        isGroup: true,
      }),
    ]);

    const sanitizedConversations = sanitizeMongoData(conversations).map(
      (conversation) => ({
        ...conversation,
        latestMessage: conversation.messages?.[0] || null,
        messages: undefined,
      }),
    );

    return sendSuccessResponse(
      res,
      {
        conversations: sanitizedConversations,
        pagination: buildPagination(totalCount, validatedPage, validatedLimit),
      },
      successMessages.FETCH_GROUP_CHATS_SUCCESS,
    );
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
};

export const groupChatMessages = async (req, res) => {
  try {
    const { id: conversationId } = req?.params;
    const { id: loggedInUserId } = req?.data;

    if (conversationId && !isValidMongoDbObjectId(conversationId)) {
      throw new ValidationError(
        status.forbidden,
        errorMessages.INVALID_CONVERSATION_ID_FORMAT_ERROR,
        { conversationId },
        req?.url,
      );
    }

    const { page, limit } = req?.query;
    const validatedPage = pageValidator(page);
    const validatedLimit = limitValidator(limit);
    const skip = ((validatedPage || 1) - 1) * (validatedLimit || 10);

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: loggedInUserId,
      isGroup: true,
    })
      .populate("participants", Object.values(defaultUserProperties))
      .lean();

    if (!conversation) {
      return sendSuccessResponse(
        res,
        {
          conversation: null,
          messages: [],
          pagination: buildPagination(0, validatedPage, validatedLimit),
        },
        successMessages.FETCH_GROUP_CHAT_MESSAGES_SUCCESS,
      );
    }

    const sanitizedConversation = sanitizeMongoData(conversation);

    const [messages, totalMessageCount] = await Promise.all([
      Message.find({ conversationId: sanitizedConversation.id })
        .populate("senderId", Object.values(defaultUserProperties))
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(validatedLimit || 10),

      Message.countDocuments({ conversationId: conversation._id }),
    ]);

    return sendSuccessResponse(
      res,
      {
        conversation: sanitizedConversation,
        messages: sanitizeMongoData(messages),
        pagination: buildPagination(
          totalMessageCount,
          validatedPage,
          validatedLimit,
        ),
      },
      successMessages.FETCH_GROUP_CHAT_MESSAGES_SUCCESS,
    );
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
};

export const editMessage = async (req, res) => {
  try {
    const { id: messageId } = req?.params;
    const { id: loggedInUserId, message: newMessage } = req?.data;

    if (messageId && !isValidMongoDbObjectId(messageId)) {
      throw new ValidationError(
        status.forbidden,
        errorMessages.INVALID_MESSAGE_ID_FORMAT_ERROR,
        { messageId },
        req?.url,
      );
    }

    if (!newMessage?.trim()) {
      throw new ValidationError(
        status.badRequest,
        errorMessages.INVALID_MESSAGE_ERROR,
        {},
        req?.url,
      );
    }

    const editedMessage = await Message.findOneAndUpdate(
      { _id: messageId, senderId: loggedInUserId },
      { message: newMessage.trim(), isEdited: true },
      { new: true },
    ).populate("senderId", Object.values(defaultUserProperties));

    if (!editedMessage) {
      throw new ForbiddenError(
        status.forbidden,
        errorMessages.INVALID_EDIT_MESSAGE_ERROR,
        { messageId },
        req?.url,
      );
    }

    return sendSuccessResponse(
      res,
      { message: sanitizeMongoData(editedMessage) },
      successMessages.EDIT_CHAT_MESSAGE_SUCCESS,
    );
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req?.params;
    const { id: loggedInUserId } = req?.data;

    if (messageId && !isValidMongoDbObjectId(messageId)) {
      throw new ValidationError(
        status.forbidden,
        errorMessages.INVALID_NOTIFICATION_ID_FORMAT_ERROR,
        { messageId },
        req?.url,
      );
    }

    const deletedMessage = await Message.findOneAndDelete({
      _id: messageId,
      senderId: loggedInUserId,
    });

    if (!deletedMessage) {
      throw new ForbiddenError(
        status.forbidden,
        errorMessages.INVALID_DELETE_MESSAGE_ERROR,
        { messageId },
        req?.url,
      );
    }

    await Conversation.updateOne(
      { _id: deletedMessage.conversationId },
      { $pull: { messages: deletedMessage._id } },
    );

    return sendSuccessResponse(
      res,
      { messageId },
      successMessages.DELETE_CHAT_MESSAGE_SUCCESS,
    );
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
};
