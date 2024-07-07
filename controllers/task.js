const tasking = require("../model/task")

const jwt = require("jsonwebtoken")
const secret = "Rohan123504"


 function addTask(req,res) {
    jwt.verify(req.token,secret,async (err,data)=>{
        if (err) {
            return res.send({err : "invalid token !"})
        }else{

            const {title,description,status} = req.body
            
            const tasks = new tasking({id : data._id,title : title,description : description,status : status})
            
            await tasks.save()

            return res.json({msg : "success",data : data._id})
        }
    })
}


function updateTask(req,res) {
    
    jwt.verify(req.token,secret,async (err,data)=>{
        if(err){
            return res.send({err : "invalid token !"})
        }else{

            const id = req.params.id
             
            const updatedData = await tasking.findByIdAndUpdate(id,req.body)

            return res.json({msg : "success",data : updatedData})
        }
    })
}


function deleteTask(req,res) {
    
    jwt.verify(req.token,secret,async (err,data)=>{
        if(err){
            return res.send({err : "invalid token !"})
        }else{

            const id = req.params.id
             
            const deletedData = await tasking.findByIdAndDelete(id)

            return res.json({msg : "success",data : deletedData})
        }
    })
}

module.exports = {addTask,updateTask,deleteTask}