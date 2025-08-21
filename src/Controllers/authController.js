const bcrypt = require('bcrypt');
const saltRounds = 10;
const { emailRegex, passwordRegex } = require('../helpers/allRagex');
const authModel = require('../Models/authModel');
const { generateOTP, getExpiryTime } = require('../helpers/allGenarator');
const otpGenarator = require('../helpers/otpGenarator');
const { OtpRegistrationTemplats } = require('../helpers/htmlTemplats');

// ---------- registration -----------------
const registrationController = async (req, res) => {

    const { userName, email, password, phone, gender } = req.body

    // ----------- validation ---------------
    if (!userName || !email || !password || !phone || !gender)
        return res.status(404).send('user Invalid')
    if (!emailRegex.test(email) || !passwordRegex.test(password))
        return res.status(401).send('email or password invalid')

    const exsitEmail = await authModel.findOne({email})
      if(exsitEmail) return res.status(406).send('Email already registered')
  

    if (gender == "male") avater = "https://img.favpng.com/1/9/15/3d-male-avatar-cartoon-man-with-glasses-Bnq3PC7J_t.jpg"
    if (gender == "female") avater = "https://www.shutterstock.com/image-vector/black-woman-smiling-portrait-vector-600nw-2281497689.jpg"

    const hashPassword = await bcrypt.hashSync(password, saltRounds);
    const OTP = generateOTP()
     const otpDigits = OTP.split("")

    //  -------------- database save data ------------
    const saveUser = await new authModel({
        userName: userName.trim(),
        email,
        phone,
        password: hashPassword,
        gender,
        avater,
        otp: OTP,
        otpExpaireTime: getExpiryTime(),
    })
   await saveUser.save()
        .then(() => {   
            
            const userInfo  = {

                "UserId" : saveUser.id ,
                "UserName" : saveUser.userName ,
                "email" : saveUser.email ,
                "phone" : saveUser.phone ,
                "password" : saveUser.password ,
                "gender" : saveUser.gender ,
                "avater" : saveUser.avater 
                
            }
            otpGenarator(email, OtpRegistrationTemplats(otpDigits) )

            res.status(201).send({userInfo : userInfo})
        })


}

// ---------- Otp verification -----------------
 
const otpVerification = async (req,res)=>{

    const {otp} = req.body
    const exsitOtp = await authModel.findOne({otp})
    if(!exsitOtp) return res.status(406).send('Otp invalide')
    if(exsitOtp.otpExpaireTime < Date.now()) return res.status(408).send('OTP Expaired')

        exsitOtp.isVerified = true
        exsitOtp.otp = null
        exsitOtp.otpExpaireTime = null
        exsitOtp.save()
        res.status(200).send(exsitOtp)
}

// ---------- Resend Otp -----------------
const reSendOtp = async (req, res)=> {
    const {email} = req.body
    const exsitUser = await authModel.findOne({email})
    if(!exsitUser) return res.status(404).send('User not found')
    
    let otp = generateOTP()
    const otpDigits = String(otp).split("")

     exsitUser.isVerified = false
        exsitUser.otp = otp
        exsitUser.otpExpaireTime = getExpiryTime()
        exsitUser.save()
        .then(()=>{
                otpGenarator(email, exsitUser.userName,  OtpRegistrationTemplats( otpDigits))
        })

         res.status(200).send(exsitUser)
}

// ---------- Login -----------------
const loginController =async (req, res)=>{
    
    const {email , password}= req.body
    if (!email || !password ) return res.status(404).send('user Invalid')
    if (!emailRegex.test(email) || !passwordRegex.test(password)) return res.status(401).send('email or password invalid')

    const exsitUser = await authModel.findOne({email})
      if(!exsitUser) return res.status(404).send('Email invalid please register')
        if(exsitUser.isVerified === false) return res.status(401).send('email is not verified')

        const match = await bcrypt.compare(password, exsitUser.password)
           if(!match) return  res.status(406).send('Wrong password') 

            const userInfo  = {

                "UserId" : exsitUser.id ,
                "UserName" : exsitUser.userName ,
                "email" : exsitUser.email ,
                "phone" : exsitUser.phone ,
                "password" : exsitUser.password ,
                "gender" : exsitUser.gender ,
                "avater" : exsitUser.avater 
                
            }

    res.status(200).send( userInfo )
}


module.exports = { registrationController , otpVerification, reSendOtp, loginController}