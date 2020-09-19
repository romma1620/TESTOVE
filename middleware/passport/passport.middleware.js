const jwt = require("jwt-then");
const keys = require('../../config/keys')

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            console.log("Forbidden!!");
        }
        const token = req.headers.authorization.split(" ")[1];
        const payload = await jwt.verify(token, keys.JWT);
        req.payload = payload;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Forbidden ",
        });
    }
};
