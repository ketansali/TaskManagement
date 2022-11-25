const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    contact: {
      type: Number,
      trim: true,
    },
    Gender: {
      type: String,
      trim: true,
    },
    CityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cityMaster",
    },
    StateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stateMaster",
    },
    CountryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countryMaster",
    },
    Address: {
      type: String,
      trim: true,
    },
    PinCode: {
      type: Number,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isSuperAdmin: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
    },
    isSuperVisor: {
      type: Boolean,
    },
    isUser: {
      type: Boolean,
    },

    forgetPasswordOtp: {
      type: Number,
    },
    forgetPasswordOtpExpireTime: {
      type: Date,
    },

    accountActivationCode: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userMaster",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userMaster",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });
UserSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
    if (error) return next(err);
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(err);
      user.password = hash;
      next();
    });
  });
});
module.exports = mongoose.model("userMaster", UserSchema);
