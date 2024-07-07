const express = require("express")
const app = express()
const port = 8081 

//routes
const userRoute = require("./routes/user")

// database connectivity
const {connection} = require("./connectivity")

connection("mongodb://127.0.0.1:27017/practice").then(()=>{
    console.log("Mongodb server connected successfully.......")
}).catch((err)=>{
   console.log("Mongodb error",err);
})

// data parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// using routes
app.use("/user",userRoute)

app.listen(port, () => console.log("Server running on port " + port));