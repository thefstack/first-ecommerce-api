const nodemailer=require("nodemailer");
const generateRandomString = require("./generateRandomString");
  
  //   nodemailer 
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'phantomop18@gmail.com',
      pass: 'wuhk oqqf yich bvis'
    }
  });

//   send otp verification 
const sendOTPVerificationEmail=async(email)=>{
    try{
        const otp=generateRandomString(6)
        const mailOptions={
            from:"phantomop18@gmail.com",
            to:email,
            subject:"Ecommerce OTP",
            html:` <p>Your OTP is: ${otp}</p>`
        }
        
        transporter.sendMail(mailOptions,(err)=>{
            if(err){
                throw new Error("Error while sending OTP")
            }
        });
        return otp;
        
    }catch(error){
        console.log(error)
        return -1
    }
}

module.exports= sendOTPVerificationEmail