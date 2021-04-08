const Admin = require('../models/model.admin');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../configs/jwt.config")
const { body, validationResult } = require('express-validator');



exports.loginAdmin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

        Admin.findOne({
            email: req.body.email
        }).select('password').then((admin) => {
            if (admin == null) {
                error.push("email not found !")
                res.json({ error: error });
                return;
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);
            if (!passwordIsValid){
                error.push("credential error !")
                return res.json({
                    error: error
                });
            }
            else{
                var token = jwt.sign({
                    id: admin._id,
                    admin: true,
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

exports.registerAdmin = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    let adminPush = new Admin({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone
       
    })
    
    Admin.findOne({ email: req.body.email })
        .then((admin) => {
            if (admin == null) {
                adminPush.save()
                    .then(() => res.json({notification : "please login now with your info" }))
                    .catch((err) => res.json(err))
            }
            else {
                res.json("email already exist !");
            }
        })
        .catch((err) => res.json(err))
    
}



exports.getAdmin = async (req, res) => {
    await Admin.find().then((admins) => {
        res.status(200).json(admins)
    }).catch((err) => {
        res.status(500).json(err)
    })
}

exports.deleteAdmin = async (req, res) => {
    await Admin.remove({_id:req.params.idAdmin}).then(()=>{
        res.status(200).json("Admin Deleted");
    }).catch((err) => res.status(500).json(err));
}

exports.updateAdmin = async (req, res) => {
    

    await Admin.updateOne({
        _id:req.params.idAdmin}, {$set :{
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone
           
        }
    }).then(() => {
        res.status(200).json("Admin updated");
    }).catch((err) => res.status(500).json(err))

}
