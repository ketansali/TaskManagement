const mongoose = require("mongoose");
const errorResponse = require("../middlewares/error-response");
const STATE_MASTER = mongoose.model("stateMaster");
const {
  successResponse,
  badRequestResponse,
} = require("../middlewares/response");

exports.state = {
  addState: async (req, res) => {
    try {
      const stateInfo = await STATE_MASTER.findOne({
        stateName: { $regex: req.body.stateName, $options: "i" },
      });
      if (stateInfo) {
        return badRequestResponse(res, {
          message: "State already exist!",
        });
      }
      const state = {
        stateName: req.body.stateName,
        //createdBy: req.user._id,
        countryId: req.body.countryId,
      };

      const isCreated = await STATE_MASTER.create(state);
      if (isCreated) {
        return successResponse(res, {
          message: "State created successfully",
        });
      } else {
        return badRequestResponse(res, {
          message: "Failed to create State",
        });
      }
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  updateState: async (req, res) => {
    try {
      const stateInfo = await STATE_MASTER.findById(req.body.id);
      if (!stateInfo) {
        return badRequestResponse(res, {
          message: "State not found",
        });
      }
      const existed = await STATE_MASTER.findOne({
        stateName: { $regex: req.body.stateName, $options: "i" },
      }).findOne({ _id: { $ne: req.body.id } });
      if (existed) {
        return badRequestResponse(res, {
          message: "State already exist!",
        });
      }
      await STATE_MASTER.findOneAndUpdate(
        { _id: stateInfo._id },
        {
          $set: {
            stateName: req.body.stateName,
            // updatedBy :req.user._id,
            countryId: req.body.countryId,
          },
        }
      );
      return successResponse(res, {
        message: "State updated successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  deleteState: async (req, res) => {
    try {
      const stateInfo = await STATE_MASTER.findOne({
        _id: req.query.id,
      });
      if (!stateInfo) {
        return badRequestResponse(res, {
          message: "State not found",
        });
      }
      await STATE_MASTER.findByIdAndRemove({
        _id: stateInfo._id,
      });
      return successResponse(res, {
        message: "State deleted successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getstates: async (req, res) => {
    try {
      const keyword = req.query.search;
      const search =
        keyword && keyword !== "undefined"
          ? {
              $or: [
                { stateName: { $regex: keyword, $options: "i" } },
                { 'Country.countryName': { $in :[new RegExp(keyword,'i')]} },
              ],
            }
          : {};
          
      const page = Number.parseInt(req.query.page )||1;
      const pagesize = Number.parseInt(req.query.limit )||10;
      const skip = (page - 1) * pagesize;
  
      const total = await STATE_MASTER.countDocuments();
      const pages = Math.ceil(total / pagesize);
      const states = await STATE_MASTER.aggregate([
        {$lookup:{
          from :"countrymasters",
          localField:"countryId",
          foreignField:"_id",
          as:"Country"
        }},
        {
          $unwind : {
            path : "$Country" 
          }
        },
        {
          $match : search
        },
        {
          $sort : { 'createdAt': -1 }
        },
        {
          $project : {
            _id:1,
            stateName:1,
            "Country._id":-1,
            "Country.countryName" :1
          }
        },
        {
          $skip:skip
        },
        {
          $limit:pagesize
        }
      ])
      return successResponse(res, {
        count: states.length,
        pages,
        total,
        data: states,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getStateByCountryId: async (req, res) => {
    try {
      const stateInfo = await STATE_MASTER.find({
        countryId: req.query.id,
      });
      if (!stateInfo) {
        return badRequestResponse(res, {
          message: "State not found",
        });
      }
      return successResponse(res, {
        data: stateInfo,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getStateById: async (req, res) => {
    try {
      const stateInfo = await STATE_MASTER.findOne({
        _id: req.query.id,
      });
      if (!stateInfo) {
        return badRequestResponse(res, {
          message: "State not found",
        });
      }
      return successResponse(res, {
        data: stateInfo,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },

};
