const express=require("express");
const sendOTPVerificationEmail = require("../helpers/mailOTP");
const bcrypt=require("bcryptjs")

const router=express.Router();

// adding product in database
router.post("/",(req,res)=>{
    res.send("you are in user router")
})

// user register 
router.post("/register",async(req,res)=>{
    try{
        
        const user=require("../models/user");

        const {name,phone,email,password}=req.body;
        
        const isEmail=await user.findOne({email})
        if(isEmail){
            throw new Error("Email already exist")
        }
        const verifyUser= await sendOTPVerificationEmail(email)
            if(verifyUser==-1)
            {
                throw new Error("Failed to send OTP")
            }


        const adduser = new user({
            name,phone,email,password,
            verified:false,
            otp:verifyUser,
            carts:[]
        })

        const addedstudent = await adduser.save();
        if(!addedstudent){
            throw new Error("error while saving data to database")
        }
        res.status(200).json({id:addedstudent._id});
    }catch(error){
        res.status(400).json({error:`${error}`})
    }
})
//  verify user email 
router.post(`/verifyuser/:id`,async(req,res)=>{
    try {
        const user=require("../models/user");
        const otp=req.body.otp;
        const _id=req.params.id;

        const userData = await user.findById(_id);

        if(!userData){
            throw new Error("Invalid User")
        }
        if(otp==userData.otp)
        {
            const filter = { _id };
        const update = { verified: true, $unset: { otp: "" } };
            
        await user.updateMany(filter, update);
            res.status(200).json({id:userData._id})
        }
    else{
        throw new Error("Otp Does not Match")
    }
    } catch (error) {
        res.status(400).json({error:`${error}`});
    }
})



// user Login 
router.get("/login",async(req,res)=>{
    try {
        const user=require("../models/user");
        const {email,password}=req.body;

        const userId=await user.findOne({email})
        if(!userId){
            throw new Error("email or password is wrong")
        }

        const isPassword=await bcrypt.compare(password, userId.password)
        if(!isPassword){
            throw new Error("email or password is wrong")
        }
        const userData={
            name:userId.name,
            email:email,
            phone:userId.phone
        }
        
        res.status(200).json({userData})

    } catch (error) {
        res.status(400).json({error:`${error}`})
    }
})

router.post("/cart",async(req,res)=>{
    try{
        const {email}=req.body;
        const user=require("../models/user");
        const userData=await user.findOne({email})
        if(!userData){
            throw new Error("user Not Found")
        }
        const cartData=await userData.carts;
        res.status(200).send(cartData)


    }catch(error){
        res.status(400).json({error:`${error}`})
    }
})


module.exports=router;