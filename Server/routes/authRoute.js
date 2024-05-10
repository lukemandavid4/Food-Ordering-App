const express = require(`express`)
const multer = require(`multer`)
const {addFood, listFood, removeFood, findFood, updateFood, removeAllFood} = require(`../controllers/authController.js`)
const authRouter = express.Router()

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) =>{
    return cb(null, `${Date.now()}${file.originalname}`)
  }
})
const upload = multer({storage: storage})
authRouter.get(`/list`, listFood)
authRouter.get(`/list/:id`, findFood)
authRouter.post(`/add`, upload.single('image'), addFood)
authRouter.put(`/update/:id`, updateFood)
authRouter.delete(`/delete/:id`, removeFood)
authRouter.delete(`/delete`, removeAllFood)

module.exports = authRouter