const foodModel = require(`../models/foodSchema.js`)
const fs = require(`fs`)


const addFood = async (req, res) =>{
  let image_filename = `${req.file.filename}`
  const food = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category
  })
  try {
    res.status(200).json({success: true, message: "Food Added"})
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({message: error.message})
  }
}

const listFood = async (req, res) =>{
  try {
    const foods = await foodModel.find({})
    res.status(200).json({success: true, data: foods})
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({success: false, message: error.message})
  }
}

const removeFood = async (req, res) =>{
  try {
    const id = req.params.id
    const food = await foodModel.findByIdAndDelete(id)
    fs.unlink(`uploads/${food.image}`, () =>{})
    if (!food){
      return res.status(404).json({success: false, message: "Food not found"})
    }
    res.status(200).json({success: true, message: "Food removed successfully"})
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({success: false, message: error.message})
  }
}

const findFood = async (req, res) =>{
  try {
    const id = req.params.id
    const food = await foodModel.findById(id)
    if(!food){
      res.status(404).json({success: false, message: "Food not found"})
    }
    res.status(200).json({success: true, data: food, message: "Food found successfully"})
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({success: false, message: error.message})
  }
}

const updateFood = async (req, res) =>{
  try {
    const id = req.params.id
    const food = await foodModel.findByIdAndUpdate(id, req.body, { new: true })
    if(!food){
      res.status(404).json({success: false, message: "Food not found"})      
    }
    res.status(200).json({success: true, data: food, message: "Food found successfully"})
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({success: false, message: error.message})
  }
}

const removeAllFood = async (req, res) =>{
  try {
    const foods = await foodModel.deleteMany({})
    res.status(200).json({success: true, message: "Removed all Foods"})
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({success: false, message: error.message})
  }
}
module.exports = {addFood, listFood, removeFood, findFood, updateFood, removeAllFood}