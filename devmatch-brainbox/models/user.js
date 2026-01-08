import mongoose from "mongoose";

import {
  USER_NAME_REGEX,
  COUNTRY_CODE_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PIN_CODE_REGEX,
  PHONE_REGEX,
} from "../config/config.js";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 4,
      maxlength: 100,
      match: USER_NAME_REGEX,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: EMAIL_REGEX,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
      match: PASSWORD_REGEX,
    },
    previousPassword: {
      type: String,
      required: false,
      minlength: 6,
      maxlength: 100,
      match: PASSWORD_REGEX,
    },
    passwordLastUpdated: {
      type: Date,
      required: true,
      default: Date.now,
    },
    firstName: {
      type: String,
      required: false,
      minlength: 1,
      maxlength: 100,
      trim: true,
      lowercase: true,
    },
    middleName: {
      type: String,
      required: false,
      minlength: 1,
      maxlength: 100,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: false,
      minlength: 1,
      maxlength: 100,
      trim: true,
      lowercase: true,
    },
    nickName: {
      type: String,
      required: false,
      minlength: 1,
      maxlength: 100,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: false,
      min: 18,
      max: 100,
    },
    phone: {
      type: Number,
      required: false,
      match: PHONE_REGEX,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
      set: (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
    },
    avatarUrl: {
      type: String,
      required: false,
    },
    coverPhotoUrl: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    maritalStatus: {
      type: String,
      required: false,
      enum: ["married", "single", "separated"],
      set: (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
    },
    jobProfile: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    experience: {
      type: Number,
      min: 0,
      max: 70,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    youtube: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 100,
    },
    organization: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 100,
    },
    skills: {
      type: [String],
      required: false,
      set: (val) => {
        if (Array.isArray(val)) return val.map((s) => s.trim().toLowerCase());
        if (typeof val === "string") return [val.trim().toLowerCase()];
        return [];
      },
    },
    interests: {
      type: [String],
      required: false,
      set: (val) => {
        if (Array.isArray(val)) return val.map((s) => s.trim().toLowerCase());
        if (typeof val === "string") return [val.trim().toLowerCase()];
        return [];
      },
    },
    address: {
      street: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },
      landmark: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },
      city: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },
      state: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },
      countryCode: {
        type: Number,
        required: false,
        minlength: 1,
        maxlength: 3,
        match: COUNTRY_CODE_REGEX,
      },
      country: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 100,
      },
      pinCode: {
        type: Number,
        required: false,
        minlength: 6,
        maxlength: 6,
        match: PIN_CODE_REGEX,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
