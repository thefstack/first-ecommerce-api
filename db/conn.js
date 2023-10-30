const mongoose=require("mongoose");

mongoose.connect(process.env.DB).then(()=>{
    console.log("Connected to curis database")
}).catch((err)=>{
    console.log(`Failed to connect to curis database: ${err}`);
})