import { errorMessages, status } from "../config/config.js";
import { AuthenticationError } from "../errors/CustomError.js";
import { requestValidator } from "../validations/validation.js";

const auth = (req, res, next) => {
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

    console.log("User authorized, token : ", req?.cookies?.authToken);

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
