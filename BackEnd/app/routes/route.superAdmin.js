module.exports = app => {
    const { body, validationResult } = require('express-validator');
    const Router = require("express").Router();
    const conntrollersuperAdmin = require("../controllers/superAdmin.controller");


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

    ],conntrollersuperAdmin.loginSuperAdmin);



    // Router.route("/register").post(conntrollerAdmin.registersuperAdmin);

   

    app.use("/superadmin", Router);
}