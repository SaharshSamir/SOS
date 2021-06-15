const jwt = require('jsonwebtoken');
const keys = require("../config/keys");

module.exports = (req, res, next) => {
    try
    {
        let token;
        if (req.headers.authorization)
        {
            token = req.headers.authorization.split(" ")[1];
        }
        //something
        let decodedToken;
        if (token)
        {
            decodedToken = jwt.verify(token, keys.jwtSecretKey);
            // console.log("decoded token is: " + JSON.stringify(decodedToken));
            req.userId = decodedToken.id;

        } else
        {
            res.status(404).json({ message: "You must be logged in." });
            return;
        }
        next();
    } catch (e)
    {
        console.log(e.message);
    }

}

