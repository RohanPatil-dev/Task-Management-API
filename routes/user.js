const express = require("express")
const router = express.Router()

const {authorization} = require("../Middleware/auth")

// importing controllers
const {registerData,loginData,allData} = require("../controllers/user")
const {addTask,updateTask,deleteTask} = require("../controllers/task")

router.post("/register",registerData)

router.post("/login",loginData)

router.get('/allData',authorization,allData )

router.post("/addTask",authorization,addTask)

router.put("/updateTask/:id",authorization,updateTask)

router.delete("/deleteTask/:id",authorization,deleteTask)

module.exports = router