const express = require('express')
const router = express.Router()
const {getalluser, deleteuser , edituser ,getalluserbtid , addnewuser } = require('../Controlers/User')

router.get('/',getalluser)
router.route('/:id').get(getalluserbtid).delete(deleteuser).put(edituser)
router.post("/signup", addnewuser)
module.exports= router