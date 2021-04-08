const Livreur = require('../models/model.livreur');

exports.addLivreur = (req, res) => {


    let LivreurPush = new Livreur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        type: req.body.type
       
    })
    
    LivreurPush.save()
        .then(() => res.json({notification : "Livreur Added !" }))
        .catch((err) => res.json(err))     
    
}

exports.getLivreur = async (req, res) => {
    await Livreur.find().then((livreur) => {
        res.status(200).json(livreur)
    }).catch((err) => {
        res.status(500).json(err)
    })
}

exports.deleteLivreur = async (req, res) => {
    await Livreur.remove({_id:req.params.idLivreur}).then(()=>{
        res.status(200).json("Livreur Deleted");
    }).catch((err) => res.status(500).json(err));
}

exports.updateLivreur = async (req, res) => {
   
    await Livreur.updateOne({
        _id:req.params.idLivreur}, {$set :{
            nom: req.body.nom,
            prenom: req.body.prenom,
            type: req.body.type
           
        }
    }).then(() => {
        res.status(200).json("Livreur updated");
    }).catch((err) => res.status(500).json(err))
}