import {
  errorMessages,
  notificationProperties,
  notificationStatusProperties,
  publicProfilePropertiesForNotification,
  status,
  successMessages,
} from "../config/config.js";
import { NotificationError, ValidationError } from "../errors/CustomError.js";
import Notification from "../models/notification.js";
import { isValidMongoDbObjectId } from "../utils/authUtils.js";
import { sanitizeMongoData } from "../utils/utils.js";
import {
  limitValidator,
  pageValidator,
  validateNotificationStatus,
  validateNotificationType,
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
    const {
      status: notificationStatus,
      type: notificationType,
      id: notificationId,
    } = await req?.params;

    const { id: loggedInUserId } = req?.data;

    if (notificationId && !isValidMongoDbObjectId(notificationId)) {
      throw new ValidationError(
        status.forbidden,
        errorMessages.INVALID_NOTIFICATION_ID_FORMAT_ERROR,
        { notificationId },
        req?.url
      );
    }

    const validatedNotificationType = notificationType
      ? validateNotificationType(notificationType)
      : null;

    const validatedNotificationStatus =
      validateNotificationStatus(notificationStatus);

    let notification =
      notificationId &&
      validatedNotificationStatus === notificationStatusProperties.DELETE
        ? await Notification.findByIdAndDelete(notificationId)
        : notificationId
        ? await Notification.findByIdAndUpdate(
            notificationId,
            { status: validatedNotificationStatus },
            { new: true }
          ).populate({
            path: notificationProperties.FROM,
            select: Object.values(publicProfilePropertiesForNotification),
          })
        : validatedNotificationType
        ? await Notification.deleteMany({
            to: loggedInUserId,
            type: validatedNotificationType,
          })
        : await Notification.deleteMany({ to: loggedInUserId });

    if (!notification || (!notification?.id && !notification?.acknowledged)) {
      throw new NotificationError(
        status.internalServerError,
        errorMessages.NOTIFICATION_READ_FAILED_ERROR,
        { notification },
        req?.url
      );
    }

    if (!notification?.id && notification?.acknowledged) {
      notification = validatedNotificationType
        ? await Notification.find({
            to: loggedInUserId,
            type: validatedNotificationType,
          }).populate({
            path: notificationProperties.FROM,
            select: Object.values(publicProfilePropertiesForNotification),
          })
        : await Notification.find({
            to: loggedInUserId,
          }).populate({
            path: notificationProperties.FROM,
            select: Object.values(publicProfilePropertiesForNotification),
          });
    }

    const sanitizedNotification = sanitizeMongoData(notification);

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      notification: sanitizedNotification,
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
