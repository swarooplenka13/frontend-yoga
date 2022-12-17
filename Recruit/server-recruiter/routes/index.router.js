const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/recruiterProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/data', ctrlUser.data);
router.post('/update',ctrlUser.update);
router.get('/view',ctrlUser.view);
router.post('/delete', ctrlUser.delete);
router.post('/otp',ctrlUser.fpe)
router.post('/updata',ctrlUser.updata)
router.get('/v',ctrlUser.v)
router.post('/two',ctrlUser.rdata);
router.post('/sent',ctrlUser.sent);
module.exports = router;



