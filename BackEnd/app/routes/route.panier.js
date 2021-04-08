module.exports = app => {
    const Router = require("express").Router();
    const conntrollerpanier = require("../controllers/panier.controller");
    const middleWare = require("../middleware/authenticateClient")




    Router.route("/add").post(conntrollerpanier.addToPanier);
    Router.route("/:idClient").get(conntrollerpanier.getPanier);
    Router.route("/update/:idPanier").put(conntrollerpanier.updatePanier);
    Router.route("/delete/:idPanier").delete(conntrollerpanier.deletePanier);


    app.use("/panier", Router);
}