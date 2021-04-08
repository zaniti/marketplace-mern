const Categorie = require('../models/model.categorie');

exports.addCategorie = (req, res) => {


    let categoriePush = new Categorie({
        nom: req.body.nom
       
    })
    
    Categorie.findOne({ nom: req.body.nom })
        .then((categorie) => {
            if (categorie == null) {
                categoriePush.save()
                    .then(() => res.json({notification : "Category Added !" }))
                    .catch((err) => res.json(err))
                    }
            else {
                res.json("Category already exist !");
            }
        })
        .catch((err) => res.json(err))
    
}

exports.getCategorie = async (req, res) => {
    await Categorie.find().then((categories) => {
        res.status(200).json(categories)
    }).catch((err) => {
        res.status(500).json(err)
    })
}

exports.deleteCategorie = async (req, res) => {
    await Categorie.remove({_id:req.params.idCategorie}).then(()=>{
        res.status(200).json("Category Deleted");
    }).catch((err) => res.status(500).json(err));
}

exports.updateCategorie = async (req, res) => {
   
    await Categorie.updateOne({
        _id:req.params.idCategorie}, {$set :{
            nom: req.body.nom
           
        }
    }).then(() => {
        res.status(200).json("Category updated");
    }).catch((err) => res.status(500).json(err))
}