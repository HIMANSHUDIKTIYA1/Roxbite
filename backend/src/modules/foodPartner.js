const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
     fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,                   
        require: true,
        unique: true
    },
   password: {
       type: String,
       require: true
   }
});

const FoodPartner = mongoose.model('FoodPartner', foodPartnerSchema);
module.exports = FoodPartner;
