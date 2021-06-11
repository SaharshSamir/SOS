const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecretKey } = require("../config/keys");
const User = mongoose.model("users");

const logIn = async (req, res) => {
    //..
    const { email, password } = req.body;
    // console.log("In login");
    try
    {
        console.log("in login ")
        const existingUser = await User.findOne({ email });
        // console.log(`login existing user: ${JSON.stringify(existingUser)}`)
        if (!existingUser) return res.status(404).json({ message: "No user with this email" })

        const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, jwtSecretKey, { expiresIn: "1h" });
        res.status(200).json({ newUser: existingUser, token, message: "log in successful" })
    } catch (e)
    {
        console.log(e.message);
        res.status(500).json({ message: "Something went wrong :(" })
    }
}

const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
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
            password: hashedPassword
        }).save();
        console.log(`saved user: ${newUser}`);
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, jwtSecretKey, { expiresIn: "1h" });
        res.status(201).json({ newUser, token });
    } catch (e)
    {
        res.status(500).json({ message: "Something went wrong :(" })
        console.log(e.message);
    }
}

const allUsers = async (req, res) => {
    var userss = [];
    try
    {
        await User.find({}, (err, users) => {
            if (err)
            {
                console.log(err);
            } else
            {
                users.forEach((i) => {
                    userss.push(i);
                })
                console.log(userss);
                res.send(userss)
            }
            // userss = users.email;
        })
        // res.send("yay");

    } catch (e)
    {
        console.log(e);
        res.send("sorry");
    }
}

exports.logIn = logIn;
exports.signUp = signUp;
exports.allUsers = allUsers;