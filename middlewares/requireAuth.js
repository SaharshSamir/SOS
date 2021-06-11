const jwt = require('jsonwebtoken');
const keys = require("../config/keys");

module.exports = (req, res, next) => {
    try
    {   
        let token;
        // console.log(`in middleware and the headers are: ${JSON.stringify(req.headers)}`)
        if(req.headers.authorization){
            token = req.headers.authorization.split(" ")[1];
        }   
        // console.log("in middleware and the token is: " + token);
        let decodedToken;
        if (token)
        {
            decodedToken = jwt.verify(token, keys.jwtSecretKey);
            // console.log("decoded token is: " + JSON.stringify(decodedToken));
            req.userId = decodedToken.id;
            next();
            
        }else{
            res.status(404).json({message: "You must be logged in."});
            return;
        }
    } catch (e)
    {
        console.log(e.message);
    }

}

