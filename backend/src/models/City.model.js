const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    cityName : {
        type : String,
        trim : true
    },
    stateId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'stateMaster'
    },
    // createdBy : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'users'
    // },
    // updatedBy : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'users'
    // },
    isActive : {
        type : Boolean,
        trim : true
    }
   
},{timestamps:true})
module.exports = mongoose.model('cityMaster',citySchema)

