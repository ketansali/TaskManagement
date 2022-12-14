const router = require("express").Router()
const cityController = require('../controllers/city.Controller')
const { cityValidation } = require("../validators/city.Validator")

router.post('/add',cityValidation,(req,res)=>{
    return cityController.city.addCity(req,res)
})
router.post('/update',(req,res)=>{
    return cityController.city.updateCity(req,res)
})
router.get('/get',(req,res)=>{
    return cityController.city.getcitys(req,res)
})
router.delete('/delete',(req,res)=>{
    return cityController.city.deleteCity(req,res)
})
router.get('/get-city-by-id',(req,res)=>{
    return cityController.city.getCityById(req,res)
})

module.exports = router