import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { errorMessages, jwtKnownErrors, status } from "../config/config.js";
import { BcryptError, JwtError } from "../errors/CustomError.js";

export const isValidMongoDbObjectId = (id) => {
  return ObjectId.isValid(id);
};

export const getEncryptedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (!hashedPassword) {
    throw new BcryptError(
      status.internalServerError,
      errorMessages.BCRYPT_ERROR,
      { password: hashedPassword }
    );
  }

  return hashedPassword;
};

export const getJwtToken = (id) => {
  const token = jwt.sign({ id }, process.env.BRAINBOX_JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  if (!token) {
    throw new JwtError(status.internalServerError, errorMessages.JWT_ERROR, {
      token,
    });
  }

  return token;
};

export const verifyJwtToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.BRAINBOX_JWT_SECRET_KEY);

    if (!decodedToken) {
      throw new JwtError(status.internalServerError, errorMessages.JWT_ERROR, {
        token: decodedToken,
      });
    }

    return decodedToken?.id;
  } catch (error) {
    if (error.name === jwtKnownErrors.TOKEN_EXPIRED_ERROR) {
      throw new JwtError(status.forbidden, errorMessages.JWT_EXPIRED_ERROR, {
        token,
      });
    } else if (error.name === jwtKnownErrors.JWT_ERROR) {
      throw new JwtError(status.forbidden, errorMessages.JWT_INVALID_ERROR, {
        token,
      });
    } else if (error.name === jwtKnownErrors.NOT_BEFORE_ERROR) {
      throw new JwtError(status.forbidden, errorMessages.JWT_NOT_BEFORE_ERROR, {
        token,
      });
    } else {
      throw new JwtError(status.internalServerError, errorMessages.JWT_ERROR, {
        token,
      });
    }
  }
};

export const comparePassword = async (incomingPassword, existingPassword) => {
  const isPasswordCorrect = await bcrypt.compare(
    incomingPassword,
    existingPassword
  );

  if (isPasswordCorrect === undefined || isPasswordCorrect === null) {
    throw new BcryptError(
      status.internalServerError,
      errorMessages.BCRYPT_ERROR,
      { password: incomingPassword }
    );
  }

  return isPasswordCorrect;
};

export const isPasswordExpired = (passwordLastUpdated) => {
  const THREE_MONTHS = 1000 * 60 * 60 * 24 * 90;
  return Date.now() - new Date(passwordLastUpdated).getTime() > THREE_MONTHS;
};
