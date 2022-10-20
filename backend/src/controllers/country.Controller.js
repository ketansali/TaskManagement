const mongoose = require("mongoose");
const errorResponse = require("../middlewares/error-response");
const COUNTRY_MASTER = mongoose.model("countryMaster");
const {
  successResponse,
  badRequestResponse,
} = require("../middlewares/response");

exports.country = {
  addCountry: async (req, res) => {
    try {
      const countryInfo = await COUNTRY_MASTER.findOne({
        countryName: { $regex: req.body.countryName, $options: "i" },
      });
      if (countryInfo) {
        return badRequestResponse(res, {
          message: "Country already exist!",
        });
      }

      const country = {
        countryName: req.body.countryName,
        // createdBy: req.user._id,
      };

      const isCreated = await COUNTRY_MASTER.create(country);
      if (isCreated) {
        return successResponse(res, {
          message: "Country created successfully",
        });
      } else {
        return badRequestResponse(res, {
          message: "Failed to create Country",
        });
      }
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  updateCountry: async (req, res) => {
    try {
      
      const countryInfo = await COUNTRY_MASTER.findById(req.body.id);
      if (!countryInfo) {
        return badRequestResponse(res, {
          message: "Country not found",
        });
      }
      const existed = await COUNTRY_MASTER.findOne({
        countryName: { $regex: req.body.countryName, $options: "i" },
      }).findOne({ _id: { $ne: req.body.id } });
      if (existed) {
        return badRequestResponse(res, {
          message: "Country already exist!",
        });
      }
      await COUNTRY_MASTER.findOneAndUpdate(
        { _id: countryInfo._id },
        {
          $set: {
            countryName: req.body.countryName,
            //updatedBy :req.user._id
          },
        },{new:true}
      );
      return successResponse(res, {
        message: "Country updated successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  deleteCountry: async (req, res) => {
    try {
      const countryInfo = await COUNTRY_MASTER.findOne({
        _id: req.query.id,
      });
      if (!countryInfo) {
        return badRequestResponse(res, {
          message: "Country not found",
        });
      }
      await COUNTRY_MASTER.findByIdAndRemove({
        _id: countryInfo._id,
      });
      return successResponse(res, {
        message: "Country deleted successfully",
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getCountries: async (req, res) => {
    try {
      const keyword = req.query.search;
      const search = keyword && keyword !== 'undefined'
        ? { $or: [{ countryName: { $regex: keyword, $options: "i" } }] }
        : {};
      const page = req.query.page || 1;
      const pagesize = req.query.limit || 10;
      const skip = (page - 1) * pagesize;
      const total = await COUNTRY_MASTER.countDocuments();
      const pages = Math.ceil(total / pagesize);
      const coutries = await COUNTRY_MASTER.find(search).sort({createdAt:-1}).skip(skip).limit(pagesize);
      return successResponse(res, {
        count: coutries.length,
        pages,
        total,
        data: coutries,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
  getCountryById: async (req, res) => {
    try {
      const countryInfo = await COUNTRY_MASTER.findOne({
        _id: req.query.id,
      });
      if (!countryInfo) {
        return badRequestResponse(res, {
          message: "Country not found",
        });
      }
      return successResponse(res, {
        data: countryInfo,
      });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },
};
