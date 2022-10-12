const mongoose = require('mongoose')
const errorResponse = require('../middlewares/error-response')
const CITY_MASTER = mongoose.model('cityMaster')
const { successResponse, badRequestResponse } = require('../middlewares/response')

exports.city = {
    addCity : async  (req,res)=>{
        try {
            const cityInfo = await CITY_MASTER.findOne({
                cityName: {$regex : req.body.cityName, $options:'i'},
              },);
              if (cityInfo) {
                return badRequestResponse(res, {
                  message: "City already exist!",
                });
              }
            const city = {
                cityName: req.body.cityName,
              //  createdBy: req.user._id,
                stateId :req.body.stateId,
            }

            const isCreated = await CITY_MASTER.create(city)
            if (isCreated) {
              return successResponse(res, {
                message: 'City created successfully',
              })
            } else {
              return badRequestResponse(res, {
                message: 'Failed to create City',
              })
            }
          } catch (error) {
            return errorResponse(error, req, res)
          }
         
    },
    updateCity : async  (req,res)=>{
        try {
            const cityInfo = await CITY_MASTER.findById(req.body.id)
            if (!cityInfo) {
              return badRequestResponse(res, {
                message: 'City not found',
              })
            }
            const existed = await CITY_MASTER.findOne({
                cityName: {$regex : req.body.cityName, $options:'i'},
              },).findOne({_id:{$ne:req.body.id}})
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
                 stateId :req.body.stateId
                },
              },
            )
            return successResponse(res, {
              message: 'City updated successfully',
            })
          } catch (error) {
            return errorResponse(error, req, res)
          } 
    },
    deleteCity : async  (req,res)=>{
        try {
            const cityInfo = await CITY_MASTER.findOne({
              _id: req.query.id,
            })
            if (!cityInfo) {
              return badRequestResponse(res, {
                message: 'City not found',
              })
            }
            await CITY_MASTER.findByIdAndRemove({
              _id: cityInfo._id,
            })
            return successResponse(res, {
              message: 'City deleted successfully',
            })
          } catch (error) {
            return errorResponse(error, req, res)
          } 
    },
    getcitys : async  (req,res)=>{
        try {
            const cityes = await CITY_MASTER.find({})
            return successResponse(res, {
              data: cityes,
            })
          } catch (error) {
            return errorResponse(error, req, res)
          }
    },
    getCityById : async  (req,res)=>{
        try {
            const cityInfo = await CITY_MASTER.findOne({
              _id: req.query.id,
            })
            if (!cityInfo) {
              return badRequestResponse(res, {
                message: 'City not found',
              })
            }
            return successResponse(res, {
              data: cityInfo,
            })
          } catch (error) {
            return errorResponse(error, req, res)
          }
         
    },
}
