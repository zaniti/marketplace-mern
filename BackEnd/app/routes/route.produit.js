module.exports = app => {
    const Router = require("express").Router();
    const conntrollerproduit = require("../controllers/produit.controller");
    const middleWare = require("../middleware/authenticateVendeur")


    Router.route("/add").post(conntrollerproduit.addProduit);
    Router.route("/").get(conntrollerproduit.getProduits);
    Router.route("/:idProduit").get(conntrollerproduit.getProduit);
    Router.route("/myproducts/:idVendeur").get(middleWare.Vendeur,conntrollerproduit.getProduitsVendeur);


    Router.route("/update/:idProduit").put(middleWare.Vendeur,conntrollerproduit.updateProduit);
    Router.route("/delete/:idProduit").delete(middleWare.Vendeur,conntrollerproduit.deleteProduit);


    app.use("/produit", Router);
}