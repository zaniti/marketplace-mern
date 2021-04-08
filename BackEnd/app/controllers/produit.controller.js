const Produit = require('../models/model.produit');
const Vendeur = require('../models/model.vendeur');

const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
var xss = require('xss');



exports.addProduit = async (req, res) => {

    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
          // @ts-ignore
          cb(null, __basedir + "/app/upload/imgs");
        },
        filename: (req, file, cb) => {
          file.originalname = Date.now() +'-'+ file.originalname
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
        

            Vendeur.findOne({ _id: req.body.idVendeur })
            .then(async (vendeur) => {
                if((vendeur.type == "Starter" && vendeur.produits < 10) || (vendeur.type == "Pro" && vendeur.produits < 50) || (vendeur.type == "Expert")){
                    
                    

                    let produitPush = new Produit({
                        nom: req.body.nom,
                        prix: req.body.prix,
                        quantite: req.body.quantite,
                        photo: req.file.originalname,
                        idCategorie: req.body.idCategorie,
                        idVendeur: req.body.idVendeur
                       
                    })

                            produitPush.save()
                            .then(() => {
                            vendeur.produits = vendeur.produits+1;
                            vendeur.save()
                                .then(() => res.json({notification : "Product Added !" }))
                                .catch((err) => res.json(err))
                            
                            })
                            .catch((err) => res.json(err))


                }else {
                    if(vendeur.type == "Starter"){
                        res.json({notification : "please upgrade ur account to Pro"})

                    }
                    if(vendeur.type == "Pro"){
                        
                        res.json({notification : "please upgrade ur account to Expert"})

                    }
                }
            })
            .catch((err) => res.json(err))
    } catch (err) {
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

exports.getProduits = async (req, res) => {
    await Produit.find().then((produits) => {
        res.status(200).json(produits)
    }).catch((err) => {
        res.status(500).json(err)
    })
}
exports.getProduitsVendeur = async (req, res) => {
    await Produit.find({idVendeur:req.params.idVendeur}).then((produits) => {
        res.status(200).json(produits)
    }).catch((err) => {
        res.status(500).json(err)
    })
}

exports.deleteProduit = async (req, res) => {
    await Produit.remove({_id:req.params.idProduit}).then(()=>{
        res.status(200).json("Product Deleted");
    }).catch((err) => res.status(500).json(err));
}

exports.updateProduit = async (req, res) => {
   
    // XSS 
    var nom = xss(req.body.nom, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var prix = xss(req.body.prix, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var quantite = xss(req.body.quantite, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
      var idCategorie = xss(req.body.idCategorie, {
        whiteList:          [],        // empty, means filter out all tags
        stripIgnoreTag:     true,      // filter out all HTML not in the whilelist
        stripIgnoreTagBody: ['script'] // the script tag is a special case, we need
                                      // to filter out its content
      });
    
      // XSS
    await Produit.updateOne({
        _id:req.params.idProduit}, {$set :{
            nom: nom,
            prix: prix,
            quantite: quantite,
            idCategorie: idCategorie,
           
        }
    }).then(() => {
        res.status(200).json("Produit updated");
    }).catch((err) => res.status(500).json(err))
}

exports.getProduit = async (req, res) => {
    await Produit.findOne({_id:req.params.idProduit}).then((produit)=>{
        res.status(200).json(produit);
    }).catch((err) => res.status(500).json(err));
}