const Client = require('../models/model.client');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../configs/jwt.config")
const nodemailer = require("../configs/nodemailer.config")
const { body, validationResult } = require('express-validator');
var xss = require('xss');




exports.registerClient = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let confirmationCode = '';
    for (let i = 0; i < 25; i++) {
    confirmationCode += characters[Math.floor(Math.random() * characters.length )];
    }

    // XSS 
    var nom = xss(req.body.nom, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var prenom = xss(req.body.prenom, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var email = xss(req.body.email, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var password = xss(req.body.password, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var phone = xss(req.body.phone, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var adresse = xss(req.body.adresse, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      // XSS

    let clientPush = new Client({
        nom: nom,
        prenom: prenom,
        email: email,
        password: bcrypt.hashSync(password, 10),
        phone: phone,
        adresse: adresse,
        confirmationCode: confirmationCode
       
    })
    
    Client.findOne({ email: req.body.email })
        .then((client) => {
            if (client == null) {
                clientPush.save()
                    .then(() => res.json({notification : "please Check email confirmation !" }))
                    .catch((err) => res.json(err))
                    nodemailer.sendConfirmationEmail(
                        clientPush.nom,
                        clientPush.email,
                        clientPush.confirmationCode
                 );
            }
            else {
                res.json({message:"email already exist !"});
            }
        })
        .catch((err) => res.json(err))
    
}


exports.loginClient = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

        Client.findOne({
            email: req.body.email
        }).select('password').select('status').select('nom').then((client) => {
            if (client == null) {
                res.json({ message: "email not found !" });
                
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, client.password);
            if (!passwordIsValid){
                res.json({
                    message: "credential error !"
                });
            }
            if (client.status != "Active") {
                res.send({
                  message: "Pending Account. Please Verify Your Email!",
                });
              }
            
            else{
                var token = jwt.sign({
                    id: client._id,
                    nom: client.nom,
                    status: client.status,
                    client: true,
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


exports.verifyClient = (req, res, next) => {
    Client.findOne({
      confirmationCode: req.params.confirmationCode,
    })
      .then((client) => {
        if (!client) {
          return res.status(404).send({ message: "client Not found." });
        }
  
        client.status = "Active";
        client.save()
             .then(() => res.json({notification : "Account Confirmed !" }))
            .catch((err) => res.json(err))
      })
      .catch((e) => console.log("error", e));
}

exports.getClient = async (req, res) => {
    await Client.find().then((clients) => {
        res.status(200).json(clients)
    }).catch((err) => {
        res.status(500).json(err)
    })
}

exports.deleteClient = async (req, res) => {
    await Client.remove({_id:req.params.idClient}).then(()=>{
        res.status(200).json("Client Deleted");
    }).catch((err) => res.status(500).json(err));
}

exports.updateClient = async (req, res) => {
   
    // XSS 
    var nom = xss(req.body.nom, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var prenom = xss(req.body.prenom, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var email = xss(req.body.email, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var password = xss(req.body.password, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var phone = xss(req.body.phone, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var adresse = xss(req.body.adresse, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      // XSS
    await Client.updateOne({
        _id:req.params.idClient}, {$set :{
            nom: nom,
            prenom: prenom,
            email: email,
            password: bcrypt.hashSync(password, 10),
            phone: phone,
            adresse: adresse,
           
        }
    }).then(() => {
        res.status(200).json("Client updated");
    }).catch((err) => res.status(500).json(err))
}