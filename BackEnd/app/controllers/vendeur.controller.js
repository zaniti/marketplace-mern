const Vendeur = require('../models/model.vendeur');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../configs/jwt.config")
const { body, validationResult } = require('express-validator');
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
var xss = require('xss');



exports.registerVendeur =  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }



    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
          // @ts-ignore
          cb(null, __basedir + "/app/upload/docs");
        },
        filename: (req, file, cb) => {
          file.originalname = Date.now() +'-'+ file.originalname
          console.log(file.originalname);
          cb(null, file.originalname);
        },
      });
    
      let uploadFile = multer({
        storage: storage,
        limits: {
          fileSize: maxSize
        },
      }).single("file");
    
      let uploadFileMiddleware = util.promisify(uploadFile);
    
      try {
        
                await uploadFileMiddleware(req, res);
                if (req.file == undefined) {
                  return res.status(400).send({ message: "Please upload a file!" });
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
                        // XSS
                   
                let vendeurPush = new Vendeur({
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    password: bcrypt.hashSync(password, 10),
                    phone: phone,
                    fichierAdministratif: req.file.originalname
                   
                })
                  
                vendeurPush.save()
                    .then(() => res.json({notification : "Account registred .. status : Pending .. !" }))
                    .catch((err) => res.json(err))
 
            
       
    }
    catch (err) {
        console.log(err);
    
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(500).send({
            message: "File size cannot be larger than 2MB!",
          });
        }
    
        res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
      }
 
}

exports.loginVendeur = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

   Vendeur.findOne({
          email: req.body.email
      }).select('password').select('status').select('type').then((vendeur) => {
          if (vendeur == null) {
              error.push("email not found !")
              res.json({ error: error });
              return;
          }
          if (vendeur.status === "Pending") {
             
              console.log(vendeur.status)
              return res.status(401).send({
                message: "Pending Account. Please wait ..",
              });
            }

             if (vendeur.status === "Suspended") {
                return res.status(401).send({
                  message: "Account Suspended !",
                });
              }
            
           
              passwordIsValid = bcrypt.compareSync(req.body.password, vendeur.password);
          if (!passwordIsValid){
              error.push("credential error !")
              return res.json({
                  error: error
              });
          }
          else{
              var token = jwt.sign({
                  id: vendeur._id,
                  vendeur: true,
                  type: vendeur.type,
              }, config.secret, {
                  expiresIn: 86400
              })
              res.status(200).send({
                  auth: true,
                  token: token
              })

          }
      
      }).catch((err) => {
          if (err) return res.status(500).send('error server')
      });
  
 
}

exports.verifyVendeur = (req, res, next) => {
  Vendeur.findOne({
    _id: req.params.id,
  })
    .then((vendeur) => {
      if (!vendeur) {
        return res.status(404).send({ message: "vendeur Not found." });
      }

      vendeur.status = "Active";
      vendeur.save()
           .then(() => res.json({notification : "Account Confirmed !" }))
          .catch((err) => res.json(err))
    })
    .catch((e) => console.log("error", e));
};

exports.suspendVendeur = (req, res, next) => {
  Vendeur.findOne({
    _id: req.params.id,
  })
    .then((vendeur) => {
      if (!vendeur) {
        return res.status(404).send({ message: "vendeur Not found." });
      }

      vendeur.status = "Suspended";
      vendeur.save()
           .then(() => res.json({notification : "Account Suspended !" }))
          .catch((err) => res.json(err))
    })
    .catch((e) => console.log("error", e));
};

exports.getVendeur = async (req, res) => {
  await Vendeur.find().then((vendeur) => {
      res.status(200).json(vendeur)
  }).catch((err) => {
      res.status(500).json(err)
  })
}

exports.updateVendeur = async (req, res) => {
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
                        // XSS
                        
   await Vendeur.updateOne({
      _id:req.params.idVendeur}, {$set :{
        nom: nom,
        prenom: prenom,
        email: email,
        password: bcrypt.hashSync(password, 10),
        phone: req.body.phone
       
    }
  }).then(() => {
      res.status(200).json("Vendeur updated");
  }).catch((err) => res.status(500).json(err))
}

exports.deleteVendeur = async (req, res) => {
  await Vendeur.remove({_id:req.params.idVendeur}).then(()=>{
      res.status(200).json("Vendeur Deleted");
  }).catch((err) => res.status(500).json(err));
}