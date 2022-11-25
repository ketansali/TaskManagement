const mongoose = require("mongoose");
const errorResponse = require("../middlewares/error-response");
const CITY_MASTER = mongoose.model("cityMaster");
const COUNTRY_MASTER = mongoose.model("countryMaster");
const {
  successResponse,
  badRequestResponse,
} = require("../middlewares/response");

exports.city = {
  addCity: async (req, res) => {
    try {
      const cityInfo = await CITY_MASTER.findOne({
        cityName: { $regex: req.body.cityName, $options: "i" },
      });
      if (cityInfo) {
        return badRequestResponse(res, {
          message: "City already exist!",
        });
      }
      const city = {
        cityName: req.body.cityName,
        //  createdBy: req.user._id,
        stateId: req.body.stateId,
      };

      const isCreated = await CITY_MASTER.create(city);
      if (isCreated) {
        return successResponse(res, {
          message: "City created successfully",
        });
      } else {
        return badRequestResponse(res, {
          message: "Failed to create City",
        });
      }
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  updateCity: async (req, res) => {
    try {
      const cityInfo = await CITY_MASTER.findById(req.body.id);
      if (!cityInfo) {
        return badRequestResponse(res, {
          message: "City not found",
        });
      }
      const existed = await CITY_MASTER.findOne({
        cityName: { $regex: req.body.cityName, $options: "i" },
      }).findOne({ _id: { $ne: req.body.id } });
      if (existed) {
        return badRequestResponse(res, {
          message: "City already exist!",
        });
      }
      await CITY_MASTER.findOneAndUpdate(
        { _id: cityInfo._id },
        {
          $set: {
            cityName: req.body.cityName,
            //updatedBy :req.user._id,
            stateId: req.body.stateId,
          },
        }
      );
      return successResponse(res, {
        message: "City updated successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  deleteCity: async (req, res) => {
    try {
      const cityInfo = await CITY_MASTER.findOne({
        _id: req.query.id,
      });
      if (!cityInfo) {
        return badRequestResponse(res, {
          message: "City not found",
        });
      }
      await CITY_MASTER.findByIdAndRemove({
        _id: cityInfo._id,
      });
      return successResponse(res, {
        message: "City deleted successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getcitys: async (req, res) => {
    try {
      const keyword = req.query.search;
      const search =
        keyword && keyword !== "undefined"
          ? {
              $or: [
                { countryName: { $regex: keyword, $options: "i" } },
                { "State.stateName": { $in: [new RegExp(keyword, "i")] } },
                { "City.cityName": { $in: [new RegExp(keyword, "i")] } },
              ],
            }
          : {};
      const page = Number.parseInt(req.query.page) || 1;
      const pagesize = Number.parseInt(req.query.limit) || 10;
      const skip = (page - 1) * pagesize;
      const total = await CITY_MASTER.countDocuments();
      const pages = Math.ceil(total / pagesize);
      const cityes = await COUNTRY_MASTER.aggregate([
        {
          $lookup: {
            from: "statemasters",
            localField: "_id",
            foreignField: "countryId",
            as: "State",
          },
        },
        {
          $unwind: "$State",
        },
        {
          $lookup: {
            from: "citymasters",
            localField: "State._id",
            foreignField: "stateId",
            as: "City",
          },
        },
        {
          $unwind: "$City",
        },
        {
          $match: search,
        },
        {
          $sort : { 'City.createdAt': -1 }
        },
        {
          $project : {
            _id:1,
            countryName:1,
            "State._id":1,
            "State.stateName":1,
            "City._id" :1,
            "City.cityName" :1
          }
        },
        {
          $skip: skip,
        },
        {
          $limit: pagesize,
        },
      ]);

      return successResponse(res, {
        count: cityes.length,
        pages,
        total,
        data: cityes,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getCityById: async (req, res) => {
    try {
      const cityInfo = await CITY_MASTER.findOne({
        _id: req.query.id,
      });
      if (!cityInfo) {
        return badRequestResponse(res, {
          message: "City not found",
        });
      }
      return successResponse(res, {
        data: cityInfo,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
};
