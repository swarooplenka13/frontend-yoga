const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/data',ctrlUser.data);
router.get('/data/:id',ctrlUser.data1);
router.post('/getdata',ctrlUser.getdata);
router.get('/view',ctrlUser.view);
router.get('/postdata',ctrlUser.postdata);
router.post('/resdata',ctrlUser.resdata);
router.post('/fpe',ctrlUser.fpe);
router.post('/apply',ctrlUser.applied)
router.post('/two',ctrlUser.rdata);
router.post('/applyget',ctrlUser.fpa)
module.exports = router;



