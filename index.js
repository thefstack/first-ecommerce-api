const express=require("express")
const app=express();
const cors=require("cors")

require("dotenv").config();

const PORT=process.env.PORT || 5000;

require("./db/conn")

// getting module of routers 
const userRouter=require("./routers/userRouter")
const productRouter=require("./routers/productRouter")

app.use(cors());
app.use(express.json());
app.use("/user",userRouter)
app.use("/products",productRouter)

app.get("/",(req,res)=>{
    res.send("this is app router")
})

app.listen(PORT,(err)=>{
    if(err){
        console.log("Connection to server failed")
    }else{
        console.log("Connection to server successfull")
    }
})