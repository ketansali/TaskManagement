const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  successResponse,
  badRequestResponse,
  notFoundResponse,
} = require("../middlewares/response");
const errorResponse = require("../middlewares/error-response");
const { getSingleImageOptions } = require("../middlewares/file-response");
const USERMASTER = mongoose.model("userMaster");
const path = require("path");
exports.account = {
    login: async function (req, res) {
        try {
          let userInfo = await USERMASTER.findOne({
            email: req.body.email,
          });
          if (userInfo) {
              if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
                  return badRequestResponse(res, {
                      message: "Authentication failed. Wrong password.",
                    });
                }
                if (!userInfo.isActive) {
                    return badRequestResponse(res, {
                        message:
                        "Your account is deactivated, please activate your account from here",
                        accountDeactive: true,
                    });
                }
                let userData = userInfo.toObject()
               delete  userData['password']
            // create a token
            var token = jwt.sign({userData}, process.env.secret, {
              expiresIn: "24h", // expires in 24 hours
            });
            return successResponse(res, {
              message: "You are logged in successfully!",
              token,
              data:userData,
            });
          }
          return notFoundResponse(res, {
            message: "Email not found!",
          });
        } catch (error) {
          return errorResponse(error, req, res);
        }
      },
  ragister: async (req, res) => {
    const userInfo = await USERMASTER.findOne({
      email: req.body.email,
    });
    if (userInfo) {
      return badRequestResponse(res, {
        message: "Email already exist!",
      });
    }
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isSuperAdmin: true,
      isActive: true,
    };
    if (req.files && Object.keys(req.files).length > 0) {
      const storePath ='users/images'
      const fileInfo = getSingleImageOptions(req,storePath);
      const extensionName = path.extname(fileInfo.fileName); // fetch the file extension
      const allowedExtension = [".png", ".jpg", ".jpeg"];
      if (!allowedExtension.includes(extensionName)) {
        return badRequestResponse(res, {
          message: "!Invalid image",
        });
      }

      user.image = fileInfo.fileName;
      fileInfo.uploadedFile.mv(fileInfo.uploadFilePath, async (err) => {
        if (err)
          return badRequestResponse(res, {
            message: "Failed to save file",
          });
      });
    }
    

    var isCreated = await USERMASTER.create(user);
    if (isCreated)
      return successResponse(res, {
        message: "User created!",
      });
    else
      return badRequestResponse(res, {
        message: "Failed to create user",
      });
  },
};
