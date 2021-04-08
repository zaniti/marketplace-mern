module.exports = app => {
    const { body, validationResult } = require('express-validator');
    const Router = require("express").Router();
    const conntrollerClient = require("../controllers/client.controller");
    const middleWare = require("../middleware/authenticateAdmin")


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

    ],conntrollerClient.loginClient);

    Router.route("/register").post([
        body('nom')
        .not().isEmpty()
        .withMessage('please enter name'),

        body('prenom')
        .not().isEmpty()
        .withMessage('please enter prenom'),
        
        body('email')
        .not().isEmpty()
        .withMessage('please enter email')
        .isEmail()
        .withMessage('must be an email'),

        body('password')
        .not().isEmpty()
        .withMessage('please enter password')
        .isLength({ min: 4 })
        .withMessage('must be at least 4 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),

        body('phone')
        .not().isEmpty() 
        .withMessage('please enter phone')
        .isMobilePhone()
        .withMessage('please enter correct mobile phone'),

        body('adresse')
        .not().isEmpty()
        .withMessage('please enter adresse'),
    ],conntrollerClient.registerClient);

    Router.route("/confirm/:confirmationCode").get(conntrollerClient.verifyClient);
    Router.route("/").get(middleWare.admin,conntrollerClient.getClient);

    Router.route("/delete/:idClient").delete(middleWare.admin,conntrollerClient.deleteClient);
    Router.route("/update/:idClient").put(conntrollerClient.updateClient);
    

    app.use("/client", Router);
}