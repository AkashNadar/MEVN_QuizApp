const jwt = require('jsonwebtoken');
require('dotenv').config;

exports.auth_token = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header.split(' ');
    if(token == null){
        return res.status(401).json({
            message: "token not found",
        })
    }
    jwt.verify(token[1], process.env.SECRET, (err, user) => {

        if(err){
            return res.status(401).json({
                message: "token does not match",
            })
        }

        next();
    })
}