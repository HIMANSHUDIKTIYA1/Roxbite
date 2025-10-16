
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/auth.controller')



 router.post("/user/register", Controller.registerUser);
router.post("/user/login", Controller.loginUser);
router.post("/user/logout", Controller.logoutUser);
router.post("/foodPartner/register", Controller.registerPartner);
router.post("/foodPartner/login", Controller.loginPartner);
router.post("/foodPartner/logout", Controller.logoutPartner);

 module.exports = router;