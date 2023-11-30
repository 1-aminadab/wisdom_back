const jwt = require('jsonwebtoken');
const pool = require("../db/connection")
const bcrypt = require('bcrypt');
const { secretKey } = require('../config/config');
const { getUserByPhoneNumber, createUser } = require('../db/models/User');
var validator = require("email-validator");
const {checkUserExists} = require('../db/models/User')

async function register(req, res) {
    try {
        console.log("offcourse we're in")
        let { firstName, lastName,phoneNumber,gender,address, password,confirmPassword,userType, ...rest } = req.body;
  
        const userData = req.body
        for (const key in userData) {
            if (userData.hasOwnProperty(key) && !userData[key]) {
              return res.status(400).json({title:"Error", message:"please fill all fields"});;
            }
          }
          const phoneNumberRegex = /^(09|07)\d{8}$/
          if(!phoneNumberRegex.test(phoneNumber)) return res.status(400).json({title:"Invalid Phone number", message:"it start with 09 or 07 and the lenght is 10"}) 
          if(req.body.email){
            const isValid  = validator.validate(req.body.email);
            if (!isValid) return res.status(400).json({title:"Invalid Email address", message:"check you email address"}) 
          }
       
        if(password.length < 8) return res.status(400).json({title:"ERROR", message:"less than 8 character" });
        
        if(confirmPassword !== password) return res.status(400).json({ title:"Bad Rquest", message:"Password don't match" });
         const users = await checkUserExists(phoneNumber)
         if(users.length > 0 ){
            return res.status(400).json({title:"User Already Exist!", message:" Signin instead "})
         }
      
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword
        await createUser({firstName, lastName,phoneNumber,gender,address,userType, password},rest,userType);
       
        // Depending on user_type, create associated record in Teachers, Students, or Parents table
        console.log("register successfully")
        res.status(200).json({ title:"Registered successfully", message: "We'll Contact you soon" });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ title:"Registration Error", message:"Internal server error" });
    }
}



async function login(req, res) {
    try {
        const { phoneNumber, password } = req.body;
        const user = await getUserByPhoneNumber(phoneNumber);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
// JWT token with COOKIE 
        const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
        res.cookie('accessToken', token, { httpOnly: true });
        res.json({ token, user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


function logout(req, res) {
    console.log("open req");
    console.log(req)
    console.log("end req");
    try {
        res.clearCookie('accessToken');
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
function verifieToken(req, res, next) {
    const cookies = req.headers.cookie
    const token = cookies.split("=")[1]

    if(!token){
      return  res.status(404).json({message: "No token found"})
    }
    jwt.verify(String(token),secretKey,(err, user)=>{
        if(err) return res.status(400).json({message:"Invalid Token"})
        next()
    })
}
module.exports = {
    register,
    login,
    logout,
};
