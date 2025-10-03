import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { errorMessages, status } from "../config/config.js";
import { BcryptError, JwtError } from "../errors/CustomError.js";

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
