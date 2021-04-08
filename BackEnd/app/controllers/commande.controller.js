const Commande = require('../models/model.commande');
const Panier = require('../models/model.panier');
const Vendeur = require('../models/model.vendeur');



var xss = require('xss');



exports.addCommandeCC = async (req, res) => {

   await Panier.find({idClient:req.params.idClient})
    .populate('idProduit')
    .then(async (panier) => {
        let Produits = [];
        let Quantite = [];
        let PrixTotal = []
        let DateLivraison = [];
        let j = 0;
        let chiffreAffaires;


        for(i=0; i < panier.length ; i++){
            Produits.push(panier[i].idProduit)
            Quantite.push(panier[i].Quantite)
            PrixTotal.push(panier[i].idProduit.prix*panier[i].Quantite)
        }
        

        for(const produit of Produits){
            
            let vendeur = await Vendeur.find({_id:produit.idVendeur}).select('type').select('chiffreAffaires')
        
            chiffreAffaires = vendeur[0].chiffreAffaires + PrixTotal[j] 

            if(chiffreAffaires < 5000){
                await Vendeur.updateOne({
                    _id:produit.idVendeur}, {$set :{
                        chiffreAffaires: chiffreAffaires            
                    }
                })
            }

            if(chiffreAffaires > 5000 && chiffreAffaires < 20000){
                await Vendeur.updateOne({
                    _id:produit.idVendeur}, {$set :{
                        chiffreAffaires: chiffreAffaires,
                        type: 'Pro'            
                    }
                })
            }
            if(chiffreAffaires > 20000){
                await Vendeur.updateOne({
                    _id:produit.idVendeur}, {$set :{
                        chiffreAffaires: chiffreAffaires,
                        type: 'Expert'            
                    }
                })
            }

            var date = new Date();
           
           
           if (vendeur[0].type == "Starter") {
               for(i=0; i<5 ; i++){
                   if(date.getDay() == 6 || date.getDay() == 0){
                       date.setDate(date.getDate() + 2);

                    }else {
                       date.setDate(date.getDate() + 1);

                    } 
                }
                DateLivraison.push(date)

           }
           if (vendeur[0].type == "Pro") {

              for(i=0; i<5 ; i++){
               if(date.getDay() == 6 || date.getDay() == 0){
                   date.setDate(date.getDate() + 2);

                }else {
                   date.setDate(date.getDate() + 1);
                } 

              }
              
              DateLivraison.push(date)
 
           }
           if (vendeur[0].type == "Expert") {
               if(date.getDay() == 6 ){
                   date.setDate(date.getDate() + 3);                   
               }
               else if(date.getDay() == 0){
                   date.setDate(date.getDate() + 2);
               }else {
                   date.setDate(date.getDate() + 1);

                } 
                DateLivraison.push(date)
           }

           
j++
        }
       
        let commandePush = new Commande({
            status: 'validé',
            Produits: Produits,
            Quantite: Quantite,
            idClient: req.params.idClient,
            PrixTotal: PrixTotal,
            DateLivraison: DateLivraison,
            FullName: req.body.FullName,
            adresse: req.body.adresse,
            Phone: req.body.Phone,

        })

      commandePush.save()
      .then(async ()=>{
          await Panier.deleteMany({idClient:req.params.idClient})
          .then(() => res.json({notification: "commande Added !"})) 
      } )
      .catch((err) => res.json(err))
 
    }).catch((err) => {
        res.status(500).json(err)
    })

    
}


exports.addCommandeCash = async (req, res) => {

    await Panier.find({idClient:req.params.idClient})
    .populate('idProduit')
    .then(async (panier) => {
        let Produits = [];
        let Quantite = [];
        let PrixTotal = []
        let DateLivraison = [];
        let j = 0;
        let chiffreAffaires;

        for(i=0; i < panier.length ; i++){
            Produits.push(panier[i].idProduit)
            Quantite.push(panier[i].Quantite)
            PrixTotal.push(panier[i].idProduit.prix*panier[i].Quantite)
        }
       

        for(const produit of Produits){
            
            let vendeur = await Vendeur.find({_id:produit.idVendeur}).select('type').select('chiffreAffaires')
            
            chiffreAffaires = vendeur[0].chiffreAffaires + PrixTotal[j] 
            
            if(chiffreAffaires < 5000){
                await Vendeur.updateOne({
                    _id:produit.idVendeur}, {$set :{
                        chiffreAffaires: chiffreAffaires            
                    }
                })
            }
            
            if(chiffreAffaires > 5000 && chiffreAffaires < 20000){
                await Vendeur.updateOne({
                    _id:produit.idVendeur}, {$set :{
                        chiffreAffaires: chiffreAffaires,
                        type: 'Pro'            
                    }
                })
            }
            if(chiffreAffaires > 20000){
                await Vendeur.updateOne({
                    _id:produit.idVendeur}, {$set :{
                        chiffreAffaires: chiffreAffaires,
                        type: 'Expert'            
                    }
                })
            }

            var date = new Date();
           
           
           if (vendeur[0].type == "Starter") {
               for(i=0; i<5 ; i++){
                   if(date.getDay() == 6 || date.getDay() == 0){
                       date.setDate(date.getDate() + 2);

                    }else {
                       date.setDate(date.getDate() + 1);

                    } 
                }
                DateLivraison.push(date)

           }
           if (vendeur[0].type == "Pro") {

              for(i=0; i<5 ; i++){
               if(date.getDay() == 6 || date.getDay() == 0){
                   date.setDate(date.getDate() + 2);

                }else {
                   date.setDate(date.getDate() + 1);
                } 

              }
              
              DateLivraison.push(date)
 
           }
           if (vendeur[0].type == "Expert") {
               if(date.getDay() == 6 ){
                   date.setDate(date.getDate() + 3);                   
               }
               else if(date.getDay() == 0){
                   date.setDate(date.getDate() + 2);
               }else {
                   date.setDate(date.getDate() + 1);

                } 
                DateLivraison.push(date)
           }

           
j++
        }
       
        let commandePush = new Commande({
            Produits: Produits,
            Quantite: Quantite,
            idClient: req.params.idClient,
            PrixTotal: PrixTotal,
            DateLivraison: DateLivraison,
            FullName: req.body.FullName,
            adresse: req.body.adresse,
            Phone: req.body.Phone,

        })

      commandePush.save()
      .then(async ()=>{
          await Panier.deleteMany({idClient:req.params.idClient})
          .then(() => res.json({notification: "commande Added !"})) 
      } )
      .catch((err) => res.json(err))
 
    }).catch((err) => {
        res.status(500).json(err)
    })

    
}

exports.getCommandes = async (req, res) => {
    await Commande.find()
    .populate('Produits')
    .then((commande) => {
        res.status(200).json(commande)
    }).catch((err) => {
        res.status(500).json(err)
    })
}

exports.verifyCommande =  async (req, res, next) => {
    Commande.findOne({
      _id: req.params.idCommande,
    })
      .then((commande) => {
        if (!commande) {
          return res.status(404).send({ message: "commande Not found." });
        }
  
        commande.status = "Validé";
        commande.save()
             .then(() => res.json({notification : "Commande Verified !" }))
            .catch((err) => res.json(err))
      })
      .catch((e) => console.log("error", e));
}

exports.LivreCommande = async (req, res, next) => {
    Commande.findOne({
      _id: req.params.idCommande,
    })
      .then((commande) => {
        if (!commande) {
          return res.status(404).send({ message: "commande Not found." });
        }
  
        commande.status = "Livré";
        commande.save()
             .then(() => res.json({notification : "Commande Livré !" }))
            .catch((err) => res.json(err))
      })
      .catch((e) => console.log("error", e));
}

exports.refuseCommande = async (req, res, next) => {
    Commande.findOne({
      _id: req.params.idCommande,
    })
      .then((commande) => {
        if (!commande) {
          return res.status(404).send({ message: "commande Not found." });
        }
  
        commande.status = "Refusé";
        commande.save()
             .then(() => res.json({notification : "Commande Refusé !" }))
            .catch((err) => res.json(err))
      })
      .catch((e) => console.log("error", e));
}

exports.AddLivreurCommande =  async (req, res, next) => {
    Commande.findOne({
      _id: req.params.idCommande,
    })
      .then((commande) => {
        if (!commande) {
          return res.status(404).send({ message: "commande Not found." });
        }
  
        commande.idLivreur = req.body.idLivreur;
        commande.save()
             .then(() => res.json({notification : "Livreur Ajouté !" }))
            .catch((err) => res.json(err))
      })
      .catch((e) => console.log("error", e));
}




