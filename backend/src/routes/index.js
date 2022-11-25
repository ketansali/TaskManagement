const router = require("express").Router()


const countryRoutes = require('./country.Routes')
const stateRoutes = require('./state.Routes')
const cityRoutes = require('./city.Routes')
const accountRoutes = require('./account.Routes')

const { ensureAuthorized } = require("../middlewares/auth")

router.use('/account',accountRoutes)
router.use('/country',countryRoutes)
router.use('/state',stateRoutes)
router.use('/city',cityRoutes)



module.exports = router