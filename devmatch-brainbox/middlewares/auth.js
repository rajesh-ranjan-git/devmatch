import { errorMessages, status } from "../config/config.js";
import { AuthenticationError, DatabaseError } from "../errors/CustomError.js";
import { requestValidator } from "../validations/validation.js";
import { isValidMongoDbObjectId, verifyJwtToken } from "../utils/authUtils.js";
import User from "../models/user.js";

const auth = async (req, res, next) => {
  try {
    const body = requestValidator(req, res);

    if (!req?.cookies || !req?.cookies?.authToken) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.UNAUTHORIZED_USER_ERROR,
        { token: req?.cookies?.authToken },
        req?.url
      );
    }

    const decodedUserId = verifyJwtToken(req?.cookies?.authToken);

    if (!isValidMongoDbObjectId(decodedUserId)) {
      throw new DatabaseError(
        status.internalServerError,
        errorMessages.INVALID_USER_ID_FORMAT_ERROR,
        { id: decodedUserId },
        req?.url
      );
    }

    const loggedInUser = await User.findById(decodedUserId, "id");

    if (!loggedInUser) {
      throw new DatabaseError(
        status.notFound,
        errorMessages.USER_NOT_EXIST_ERROR,
        { user: loggedInUser?.id },
        req?.url
      );
    }

    req.data = {
      id: loggedInUser?.id,
    };

    if (body) {
      req.data = { ...req?.data, ...body };
    }
    
    next();
  } catch (error) {
    return res
      .status(
        error?.status?.statusCode || status.internalServerError.statusCode
      )
      .json({
        status: error?.status?.message || status.internalServerError.message,
        statusCode:
          error?.status?.statusCode || status.internalServerError.statusCode,
        apiUrl: error?.apiUrl || req?.url || req?.url,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};

export default auth;
