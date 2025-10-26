const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
   
    videoUrl: { type: String  } ,
    foodPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodPartner' },
    ImageUrl: { type: String  } ,
    email: { type: String  } ,
    phone: { type: String  } ,
    location: { type: String  } ,
    Address: { type: String  } 

   
});

module.exports = mongoose.model('Food', foodSchema);

