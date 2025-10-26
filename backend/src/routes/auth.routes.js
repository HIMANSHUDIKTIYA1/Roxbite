
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')


 router.post("/user/register", Controller.registerUser);
router.post("/user/login", Controller.loginUser);
router.post("/user/logout", Controller.logoutUser);
router.post("/foodPartner/register", Controller.registerPartner);
router.post("/foodPartner/login", Controller.loginPartner);
router.post("/foodPartner/logout", Controller.logoutPartner);
router.put("/foodPartner/:profile", Controller.updateFoodPartnerProfile);
router.get("/foodPartner/:profile", authMiddleware.authFoodPartnerMiddleware, Controller.getFoodPartnerProfile);

 module.exports = router;