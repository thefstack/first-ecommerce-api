const express=require("express")
const router=express.Router();

router.get("/getproducts",async(req,res)=>{
    try {
        const products=require("../models/products")
        const productData=await products.find({})
    
        res.status(200).json(productData)
    } catch (error) {
        res.status(400).json({error:`${error}`})
    }
})

router.get("/getproducts/:id",async(req,res)=>{
    try {
        const products=require("../models/products")
        const id=req.params.id;
        const productData=await products.findOne({id});
        res.status(200).json(productData);
    } catch (error) {
        res.status(400).json({error:`${error}`})
    }
})

router.post("/addtocart/:id",async(req,res)=>{
    try{
        const {email,singleProduct}=req.body;
        const user=require("../models/user")

        const userData=await user.findOne({email})
        if(!userData){
            throw new Error("user not found")
        }
        const {id,price,title,category}=singleProduct

        userData.carts.push({id,price,title,category})
        

        const addedCart=await userData.save();
        if(!addedCart){
            throw new Error("adding to cart failed")
        }
        
        res.status(200).json({success:"successfully added"});

    }catch(error){
        res.status(400).json({error:`${error}`});
    }

})


module.exports=router