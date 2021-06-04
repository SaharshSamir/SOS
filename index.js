const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./models/User");
const authRoutes = require("./routes/auth");

mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 5000;
const app = express();
console.log("hi");

mongoose.connect(keys.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to mongo");
}).catch(e => {
    console.log(e);
})

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use("/auth", authRoutes);


if(process.NODE_ENV === "production"){
    app.use(express.static("frontend/build"));

    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

