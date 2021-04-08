const superAdmin = require('../models/model.superAdmin');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../configs/jwt.config")
const { body, validationResult } = require('express-validator');



exports.loginSuperAdmin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

         superAdmin.findOne({
            email: req.body.email
        }).select('password').then((superadmin) => {
            if (superadmin == null) {
                res.json("email not found !");
                return;
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, superadmin.password);
            if (!passwordIsValid){
               
                return res.json("credential error !");
            }
            else{
                var token = jwt.sign({
                    id: superadmin._id,
                    superadmin: true,
                }, config.secret, {
                    expiresIn: 86400
                })
                res.status(200).send({
                    auth: true,
                    token: token
                })
            }
        
        }).catch((err) => {
            if (err) return res.status(500).send('Error server.')
        });
    
   
}


// exports.registersuperAdmin = (req, res) => {

//     bcrypt.hash(req.body.password, 10, function(err, hashedPass){
//         if(err){
//             res.json({
//                 error: err
//             })
//         }

//     let superadminPush = new superAdmin({

//         email: req.body.email,
//         password: hashedPass,
      
//     })
//     superAdmin.findOne({ email: req.body.email })
//         .then((superadmin) => {
//             if (superadmin == null) {
//                 superadminPush.save()
//                     .then(() => res.json({notification : "please login now with your info" }))
//                     .catch((err) => res.json(err))
//             }
//             else {
//                 res.json("email already exist !");
//             }
//         })
//         .catch((err) => res.json(err))
//     })
// }