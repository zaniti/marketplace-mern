let config = require("../configs/jwt.config");
let jwt = require('jsonwebtoken');

exports.superAdmin = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({
            auth: false,
            message: 'token please ...'
        });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'false token'
            });
            if(decoded.superadmin == undefined){
                return res.status(403).send({
                    auth: false,
                    message: 'not authorized...'
                });
            }
            else{
                next();
            }
    })
}