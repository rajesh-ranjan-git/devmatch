import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { errorMessages, status } from "../config/config.js";
import { BcryptError, JwtError } from "../errors/CustomError.js";

export const getEncryptedPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!hashedPassword) {
      throw new BcryptError(
        status.internalServerError,
        errorMessages.BCRYPT_ERROR,
        { hashedPassword }
      );
    }

    return hashedPassword;
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

export const getJwtToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.BRAINBOX_JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    if (!token) {
      throw new JwtError(status.internalServerError, errorMessages.JWT_ERROR, {
        token,
      });
    }

    return token;
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
