import {
  errorMessages,
  notificationProperties,
  publicProfilePropertiesForNotification,
  status,
  successMessages,
} from "../config/config.js";
import { NotificationError } from "../errors/CustomError.js";
import Notification from "../models/notification.js";
import { isValidMongoDbObjectId } from "../utils/authUtils.js";
import { sanitizeMongoData } from "../utils/utils.js";
import {
  limitValidator,
  pageValidator,
  validateNotificationStatus,
} from "../validations/validation.js";

export const view = async (req, res) => {
  try {
    const { id } = await req?.data;
    const { page, limit } = await req?.query;

    const validatedPage = pageValidator(page);

    const validatedLimit = limitValidator(limit);

    const notifications = await Notification.find({ to: id })
      .select([
        notificationProperties.TYPE,
        notificationProperties.FROM,
        notificationProperties.TITLE,
        notificationProperties.BODY,
        notificationProperties.STATUS,
      ])
      .populate({
        path: notificationProperties.FROM,
        select: Object.values(publicProfilePropertiesForNotification),
      })
      .limit(validatedLimit || 10)
      .skip(((validatedPage || 1) - 1) * (validatedLimit || 10));

    if (!notifications) {
      throw new NotificationError(
        status.internalServerError,
        errorMessages.NOTIFICATION_FAILED_ERROR,
        { notifications },
        req?.url
      );
    }

    const sanitizedNotifications = sanitizeMongoData(notifications);

    const totalCount = await Notification.countDocuments({ to: id });

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: {
        notifications: sanitizedNotifications,
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
      message: successMessages.NOTIFICATION_FETCH_SUCCESS,
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

export const mark = async (req, res) => {
  try {
    const { status: notificationStatus, id: notificationId } =
      await req?.params;

    if (notificationId && !isValidMongoDbObjectId(notificationId)) {
      throw new ValidationError(
        status.forbidden,
        errorMessages.INVALID_NOTIFICATION_ID_FORMAT_ERROR,
        { otherUserId },
        req?.url
      );
    }

    const validatedNotificationStatus =
      validateNotificationStatus(notificationStatus);

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { status: validatedNotificationStatus },
      { new: true }
    );

    if (!notification) {
      throw new NotificationError(
        status.internalServerError,
        errorMessages.NOTIFICATION_READ_FAILED_ERROR,
        { notification },
        req?.url
      );
    }

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: { notification },
      message: successMessages.NOTIFICATION_READ_SUCCESS,
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
