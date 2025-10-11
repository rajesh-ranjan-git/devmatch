import {
  errorMessages,
  notificationProperties,
  publicProfilePropertiesForNotification,
  status,
  successMessages,
} from "../config/config.js";
import { NotificationError } from "../errors/CustomError.js";
import Notification from "../models/notification.js";
import { limitValidator, pageValidator } from "../validations/validation.js";

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
    const totalCount = await Notification.countDocuments({ to: id });

    return res.status(status.success.statusCode).json({
      status: status.success.message,
      statusCode: status.success.statusCode,
      data: {
        notifications,
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
  console.log("debug body : ", req.body);
  return res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    message: "Request received",
  });
};
