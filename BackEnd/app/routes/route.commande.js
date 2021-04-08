module.exports = app => {
    const Router = require("express").Router();
    const conntrollerCommande = require("../controllers/commande.controller");
    const middleWare = require("../middleware/authenticateAdmin")


    Router.route("/add/cc/:idClient").post(conntrollerCommande.addCommandeCC);
    Router.route("/add/cash/:idClient").post(conntrollerCommande.addCommandeCash);

    Router.route("/").get(middleWare.admin,conntrollerCommande.getCommandes);
    Router.route("/verify/:idCommande").put(middleWare.admin,conntrollerCommande.verifyCommande);
    Router.route("/refuse/:idCommande").put(middleWare.admin,conntrollerCommande.refuseCommande);
    Router.route("/livre/:idCommande").put(middleWare.admin,conntrollerCommande.LivreCommande);
    Router.route("/addlivreur/:idCommande").put(middleWare.admin,conntrollerCommande.AddLivreurCommande);




    app.use("/commande", Router);
}