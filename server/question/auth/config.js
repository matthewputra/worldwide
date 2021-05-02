const jwt = require("jsonwebtoken");
const User=require('../database/models/user');

module.exports.isAuth = async (req, res, next) => {
    const authHeaader = req.headers.authorization;
    if (authHeaader) {
        const token = req.headers.authorization.split("bearer ")[1];
        try {
            let result = jwt.verify(token, process.env.JWT_SECRET).user;
            req.decoded = result;
            const currentUser = await User.findOne({ _id: result._id });
            if (currentUser) {
                req.user = currentUser;
            }
            next();
        } catch (err) {
            res.send({
                status: false,
                code:400,
                error: err.message
            })
        }
    } else {
        return res.send({
            status: false,
            code: 401,
            error: "Unauthorized, Invalid token"
          })
    }
};