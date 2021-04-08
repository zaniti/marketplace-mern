module.exports = app => {
    const Router = require("express").Router();
    const conntrollercategorie = require("../controllers/categorie.controller");
    const middleWare = require("../middleware/authenticateAdmin")


    Router.route("/add").post(middleWare.admin,conntrollercategorie.addCategorie);
    Router.route("/").get(conntrollercategorie.getCategorie);
    Router.route("/update/:idCategorie").put(middleWare.admin,conntrollercategorie.updateCategorie);
    Router.route("/delete/:idCategorie").delete(middleWare.admin,conntrollercategorie.deleteCategorie);


    app.use("/categorie", Router);
}