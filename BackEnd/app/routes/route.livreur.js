module.exports = app => {
    const Router = require("express").Router();
    const controllerlivreur = require("../controllers/livreur.controller");
    const middleWare = require("../middleware/authenticateAdmin")



    Router.route("/add").post(middleWare.admin,controllerlivreur.addLivreur);
    Router.route("/").get(middleWare.admin,controllerlivreur.getLivreur);
    Router.route("/update/:idLivreur").put(middleWare.admin,controllerlivreur.updateLivreur);
    Router.route("/delete/:idLivreur").delete(middleWare.admin,controllerlivreur.deleteLivreur);


    app.use("/livreur", Router);
}