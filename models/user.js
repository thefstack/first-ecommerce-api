const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userschema=new mongoose.Schema({  
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean
    },
    otp:{
        type:String,
        expires:500
    },
    carts:[]
})

// userschema.methods.generateAuthToken=async function(){
//     try{
//         const token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
//         this.tokens=this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     }catch(err){
//         console.log(err)
//     }
// }

userschema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
    }
    if(this.isModified("otp")){
        this.otp= await bcrypt.hash(this.otp,10);
    }
    next();
})

const user=new mongoose.model('user',userschema);

module.exports=user;