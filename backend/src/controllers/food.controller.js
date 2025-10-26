const foodModel = require('../modules/food')
const storage = require('../services/storage.service');
const {v4: uuid} = require('uuid');

async function createFood(req, res) {

    const { name, description } = req.body;

   const result = await storage.uploadFile(req.file.buffer, uuid() );
   
  console.log("File uploaded to storage:", result);
  
 try {
const food = new foodModel({
 name,
 description,
 videoUrl : result.url,
 foodPartner : req.foodPartner._id  ,
    ImageUrl : req.foodPartner.profileImage  ,
    email : req.foodPartner.email  ,
    phone : req.foodPartner.phone  ,
    location : req.foodPartner.location  ,
    Address : req.foodPartner.Address
})
await food.save();
res.status(201).json({
    message: "Food created successfully",
    data: food
})
 } catch (err) {
    console.error(err);
    res.status(500).json({
        message: "Error creating food",
        error: err.message
    });
}
}

const getAllFoods = async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.status(200).json({
            message: "Foods fetched successfully",
            data: foods
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching foods",
            error: err.message
        });
    }
};

module.exports = {
    createFood,
    getAllFoods
};

