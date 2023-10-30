const mongoose=require('mongoose');

const productschema=new mongoose.Schema({  
    id:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    image:{
        type:String
    },
    rating:{
        rate:{
            type:Number
        },
        count:{
            type:Number
        }
    }
})


const products=new mongoose.model('products',productschema);

module.exports=products;