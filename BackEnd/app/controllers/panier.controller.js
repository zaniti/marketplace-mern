const Panier = require('../models/model.panier');
const Produit = require('../models/model.produit');


var xss = require('xss');



exports.addToPanier = async (req, res) => {

    let panierPush = new Panier({
        idProduit: req.body.idProduit,
        idClient: req.body.idClient,
        Quantite: req.body.Quantite
       
    })

            panierPush.save()
            .then(() => {
                res.json({notification : "Added to Cart !" })
            })
            .catch((err) => res.json(err))


    
    
}

exports.getPanier = async (req, res) => {
    await Panier.find({idClient:req.params.idClient})
    .populate('idProduit')
    .then((panier) => {
        res.status(200).json(panier)
    }).catch((err) => {
        res.status(500).json(err)
    })
}

exports.deletePanier = async (req, res) => {
    await Panier.remove({_id:req.params.idPanier}).then(()=>{
        res.status(200).json("Deleted !");
    }).catch((err) => res.status(500).json(err));
}

exports.updatePanier = async (req, res) => {
   

    await Panier.updateOne({
        _id:req.params.idPanier}, {$set :{
            Quantite: req.body.Quantite
           
        }
    }).then(() => {
        res.status(200).json("updated !!");
    }).catch((err) => res.status(500).json(err))
}

