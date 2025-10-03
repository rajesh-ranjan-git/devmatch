import { errorMessages, status } from "../config/config.js";
import { AuthenticationError, DatabaseError } from "../errors/CustomError.js";
import { requestValidator } from "../validations/validation.js";
import { verifyJwtToken } from "../utils/utils.js";
import User from "../models/user.js";

const auth = async (req, res, next) => {
  try {
    requestValidator(req, res);

    if (!req?.cookies || !req?.cookies?.authToken) {
      throw new AuthenticationError(
        status.forbidden,
        errorMessages.UNAUTHORIZED_USER_ERROR,
        { token: req?.cookies?.authToken },
        req?.url
      );
    }

    const decodedUserId = verifyJwtToken(req?.cookies?.authToken);

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
      params: req?.params,
      query: req?.query,
    };

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
        apiUrl: error?.apiUrl,
        error: {
          type: error?.type,
          message: error?.message,
          data: error?.data,
        },
      });
  }
};

export default auth;
