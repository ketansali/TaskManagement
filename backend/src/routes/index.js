const router = require("express").Router()


const countryRoutes = require('./country.Routes')
const stateRoutes = require('./state.Routes')
const cityRoutes = require('./city.Routes')

const { ensureAuthorized } = require("../middlewares/auth")

//router.use('/account',account)
router.use('/country',countryRoutes)
router.use('/state',stateRoutes)
router.use('/city',cityRoutes)



module.exports = router