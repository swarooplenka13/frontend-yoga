const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');


router.post('/avljobs', ctrlUser.register);
router.get('/showjobs', ctrlUser.userProfile);
router.get('/getd', ctrlUser.getd);
router.post('/applied', ctrlUser.data);
router.get('/view',ctrlUser.view)
router.post('/sendmail',ctrlUser.mail)
router.post('/sendmail1',ctrlUser.mail1)
router.post('/sendmail2',ctrlUser.mail2)
router.post('/delete',ctrlUser.delete)
router.post('/otp',ctrlUser.otp)
router.post('/insights',ctrlUser.insights);
module.exports = router;



