const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const Bcrypt = require('bcryptjs')

const secretKey = 'helloooo121'
module.exports = {
    Login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            if (Bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user.id, name: user.name, phone: user.phone
                }
                let token = jwt.sign(payload, secretKey, {
                    expiresIn: '24h'
                })
                res.send({ token })
            } else {
                res.send('password galat hai bhai')
            }
        } else {
            res.send('sahni aadami nahi hai')
        }
    }, decodeToken: (params) => {
        var token = params.headers["authorization"] || params.query["token"];
        var decoded = {};

        if (token) {
            decoded = jwt.verify(token, secretKey);
        }

        return decoded;
    },
    verifyToken: (req, res, next) => {
        //get Auth Header value
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader != "undefined") {
            const bearer = bearerHeader;
            const beareToken = bearer;
            req.token = beareToken;
            next();
        } else {
            res.status(403).send("forbidden");
        }
    }
}