const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    descriptions: {
        type: String,
      
    },
    status: {
        type : String,
        enum: ["pending", "in-progress", "completed"], default: "pending"
    }
});

const taskModel = mongoose.model("task",taskSchema)

module.exports = taskModel