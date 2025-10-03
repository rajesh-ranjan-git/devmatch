import {
  allowedPrivateProfileFields,
  allowedPublicProfileFields,
  status,
  successMessages,
} from "../config/config.js";
import { DatabaseError } from "../errors/CustomError.js";
import User from "../models/user.js";

export const view = async (req, res) => {
  const { id, params, query } = await req?.data;

  const user = await User.findById(
    params?.id ? params?.id : id,
    params?.id ? allowedPublicProfileFields : allowedPrivateProfileFields
  );

  if (!user) {
    throw new DatabaseError(
      status.notFound,
      errorMessages.USER_NOT_EXIST_ERROR,
      { user },
      req?.url
    );
  }

  return res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    data: { user },
    message: successMessages.FETCH_PROFILE_SUCCESS,
  });
};

export const update = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    message: "Request received",
  });
};

export const updatePassword = async (req, res) => {
  console.log("debug body : ", req.body);
  return res.status(status.success.statusCode).json({
    status: status.success.message,
    statusCode: status.success.statusCode,
    message: "Request received",
  });
};
