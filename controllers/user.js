const User = require("../model/user")

const tasking = require("../model/task")


const jwt = require("jsonwebtoken")
const secret = "Rohan123504"

const {setUser} = require("../services/service")

async function registerData(req, res) {
    const { name, email, password } = req.body

    try {
        if (!name && !email && !password) {
            return res.json({ msg: "Form is empty !" })
        }
        else if (!name) {
            return res.json({ msg: "please enter your name !" })
        } else if (!email) {
            return res.json({ msg: "please enter your email !" })
        } else if (!password) {
            return res.json({ msg: "please enter your password !" })
        } else if (password.length > 8) {
            return res.json({ msg: "password must be under the 8 characters !" })
        } else if (password.length < 8) {
            return res.json({ msg: "password must be 8 characters !" })
        }else {
            const user = new User({ name: name, email: email, password: password })

            await user.save()

            return res.status(200).json({ msg: "success", data: user })
        }
    } catch (error) {
        return res.json({ error: "server error !" })
    }
}


async function loginData(req, res) {
   try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email, password: password })

    if (!user) {
    return res.status(300).json({ msg: "Data not found !"})
    }else{
        const token = setUser(user)
    
        return res.status(200).json({ msg: "Data found !", data: user,token : token})
    }

   } catch (error) {
    return res.json({ error: "server error !" })
}
}

async function allData(req,res) {
     jwt.verify(req.token,secret,async (err,data)=>{
        if (err) {
            return res.send({err : "invalid token !"})
        }else{

        const result = await tasking.find({id : data._id})

            return res.json({msg : "success",data : result})
        }
     })
}

module.exports = { registerData, loginData,allData}