const express = require(`express`)
const userRoute = express.Router()
const {register, login, deleteUser, deleteAll} = require(`../controllers/userController`)

userRoute.post(`/register`, register)
userRoute.post(`/login`, login)
userRoute.delete(`/delete/:id`, deleteUser)
userRoute.delete(`/delete`, deleteAll)

module.exports = userRoute