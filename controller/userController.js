const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const registerAPI = async(req , res) =>{
    const {username ,email,password } =req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
           return res.status(400).json({message:"User account alredy exists"});
        }

        // password hassing
         
        const hashedpassword= await bcrypt.hash(password ,10);

        const newUser = new User({username,email,password:hashedpassword});
        await newUser.save();
        res.status(201).json({message:"Registration Succesful"})
    }catch(err){
        res.status(500).json({message:"Forbidden:server error"})
    }
};

// login

const loginAPI = async(req,res) =>{
    const {email,password} =req.body;

    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"User account not found, please register first"})
        };

        const passwordMatch = await bcrypt.compare(password,existingUser.password);

        if(!passwordMatch){
            return res.status(400).json({message:"Incorrect password"});
        }

        const token = jwt.sign({
           userid:existingUser._id,username:existingUser.username,email:existingUser.email},
           process.env.JWT_SECRET_KEY,
           {expiresIn:"1d"}
        );
        res.status(200).json({message:"Login Succesful" ,token});

    }catch(err){
        res.status(500).json({message:"Forbidden: server error"})
    }
}

module.exports = {registerAPI,loginAPI};