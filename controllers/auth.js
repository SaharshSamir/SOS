const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecretKey } = require("../config/keys");
const User = mongoose.model("users");

const logIn = async (req, res) => {
    //..
    const { email, password } = req.body;
    try
    {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "No user with this email" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, jwtSecretKey, { expiresIn: "1h" });
        res.status(200).json({ newUser: existingUser, token, message: "log in successful" })
    } catch (e)
    {
        console.error(e.message);
        res.status(500).json({ message: "Something went wrong :(" })
    }
}

const signUp = async (req, res) => {
    const { firstName, lastName, email, phoneNo, password } = req.body;
    try
    {
        const existingUser = await User.findOne({ email });
        if (existingUser)
        {
            console.log("existing user \n\n");
            console.log(existingUser);
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await new User({
            email: email,
            firstName,
            lastName,
            phoneNo,
            password: hashedPassword
        }).save();
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, jwtSecretKey, { expiresIn: "1h" });
        res.status(201).json({ newUser, token });
    } catch (e)
    {
        res.status(500).json({ message: "Something went wrong :(" })
        console.error(e.message);
    }
}


exports.logIn = logIn;
exports.signUp = signUp;
