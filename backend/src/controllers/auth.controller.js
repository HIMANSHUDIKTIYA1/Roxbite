const User = require('../modules/users')
const FoodPartner = require('../modules/foodPartner')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth.middleware')

const  registerUser = async (req , res) =>{
    const {fullname , email , password} = req.body ; 
    console.log(req.body)
    const isUserExist =  await User.findOne({email})
   if (isUserExist){

return res.status(400).json({message : "user exist "})
   
    
   }

const hashpassword = await bcrypt.hash(password, 10)

const newUser = new User({
    fullname,
    email,
    password: hashpassword
})

await newUser.save()


const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
res.cookie('token', token)
res.status(201).json({ message: 'User registered successfully' })
bcrypt.compare(password, newUser.password, (err, result) => {
    if (err) {
        return res.status(501).json({ message: 'Error comparing passwords' });
    }
    if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    
});


}
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }   

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token);
     res.status(200).json({ message: 'Login successful' });
  
}

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};
const registerPartner = async (req , res) =>{
    const {fullname , email , password} = req.body ; 
    console.log(req.body)
    const isPartnerExist =  await FoodPartner.findOne({email})
   if (isPartnerExist){

return res.status(400).json({message : "Partner already exists "})
   
    
   }

const hashpassword = await bcrypt.hash(password, 10)

const newPartner = new FoodPartner({
    fullname,
    email,
    password: hashpassword
})

await newPartner.save()


const token = jwt.sign({ id: newPartner._id }, process.env.JWT_SECRET)
res.cookie('token', token)
res.status(201).json({ message: 'Partner registered successfully' })
bcrypt.compare(password, newPartner.password, (err, result) => {
    if (err) {
        return res.status(501).json({ message: 'Error comparing passwords' });
    }
    if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    
});


}

const loginPartner = async(req, res) => {
  const   {email , password} = req.body ;

  const partner = await FoodPartner.findOne({ email })
  if(!partner){
    res.status(400).json({message: "Invalid email or password"})

  }

 
  

    const isPasswordValid = await bcrypt.compare(password, partner.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
 
    
    const token = jwt.sign({ id: partner._id }, process.env.JWT_SECRET);
    res.cookie('token', token);
     res.status(200).json({ message: 'Login successful' , data : partner });
  
}

const logoutPartner = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

 const updateFoodPartnerProfile = async (req, res) => {
  const { fullname, specialty, location, phone, email, bio , dpImage } = req.body;
    // const partnerId = req.foodPartner._id;

  try {
    const updatedPartner = await FoodPartner.findOneAndUpdate(
      { email: email },
      { fullname, email, specialty, location, phone, bio  , dpImage }, 
      { new: true, runValidators: true } 
    );
    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedPartner,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getFoodPartnerProfile = async (req, res) => {
   const partnerId = req.foodPartner._id;
    
   

  try {
     const partner = await FoodPartner.findById(partnerId).select("-password");
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      data: partner,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser , registerPartner , loginPartner , logoutPartner, updateFoodPartnerProfile , getFoodPartnerProfile };

