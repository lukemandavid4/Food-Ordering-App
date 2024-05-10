const bcrypt = require(`bcrypt`)
const validator = require(`validator`)
const userModel = require(`../models/userSchema`)
const jwt = require(`jsonwebtoken`)

const createToken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET)
}

const register = async (req, res) =>{
  const {name, email, password} = req.body
  try {
    const exist = await userModel.findOne({email})
    if (exist){
      return res.status(400).json({success: false, message: "User already exists"})
    }
    if(!validator.isEmail(email)){
      return res.status(400).json({success: false, message: "Please enter a valid email"})
    }
    if (password.length < 8){
      return res.status(400).json({success: false, message: "Please enter a strong password"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await userModel.create({
      name: name,
      email: email, 
      password: hashedPassword
    })

    const token = createToken(newUser._id)
    res.status(200).json({success: true, message: "User registered successfully", token})
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({success: false, message: error.message})
  }
}

const login = async (req, res) =>{
  const {email, password} = req.body
  try {
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(404).json({success: false, message: "User does not exist"})
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
      return res.status(400).json({success: false, message: "Invalid Credentials"})
    }
    const token = createToken(user._id)
    res.status(200).json({success: true, message: "Logged in successfully", token})
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({success: false, message: error.message})
  }
}
module.exports = {register, login}