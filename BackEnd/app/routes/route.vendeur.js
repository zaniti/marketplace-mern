module.exports = app => {
    const { body, validationResult } = require('express-validator');
    const Router = require("express").Router();
    const conntrollerVendeur = require("../controllers/vendeur.controller");
    const middleWare = require("../middleware/authenticateSuperAdmin")
    


    Router.route("/login").post([
        body('email')
        .not().isEmpty()
        .withMessage('please enter email')
        .isEmail()
        .withMessage('must be an email')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long'),
        
        body('password')
        .not().isEmpty()
        .withMessage('please enter Password')
        .isLength({ min: 4 })
        .withMessage('must be at least 4 chars long')

    ],conntrollerVendeur.loginVendeur);

    Router.route("/register").post(conntrollerVendeur.registerVendeur);

    Router.route("/confirm/:id").get(middleWare.superAdmin,conntrollerVendeur.verifyVendeur);
    Router.route("/suspend/:id").get(middleWare.superAdmin,conntrollerVendeur.suspendVendeur);
    Router.route("/").get(middleWare.superAdmin,conntrollerVendeur.getVendeur);

    Router.route("/delete/:idVendeur").delete(middleWare.superAdmin,conntrollerVendeur.deleteVendeur);
    Router.route("/update/:idVendeur").put(conntrollerVendeur.updateVendeur);


    app.use("/vendeur", Router);
}

