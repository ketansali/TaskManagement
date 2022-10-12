const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
    stateName : {
        type : String,
        trim : true
    },
    countryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'countryMaster'
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
        trim : true,
        default : true
    }
   
},{timestamps:true})
module.exports = mongoose.model('stateMaster',stateSchema)

