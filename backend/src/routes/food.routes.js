const express = require('express')
const Controller = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router(); 
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
});
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("videoUrl"), Controller.createFood);
router.get('/', Controller.getAllFoods);

module.exports = router;
