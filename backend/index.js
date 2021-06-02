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

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));


mongoose.connect(keys.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to mongo");
}).catch(e => {
    console.log(e);
})

app.get("/", (req, res) => {
    console.log(req);
    res.send("HIII");
})
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

