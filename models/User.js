const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNo: {type: Number, required: true},
    password: { type: String, required: true },

})

mongoose.model("users", userSchema);