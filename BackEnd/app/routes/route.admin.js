module.exports = app => {
    const { body, validationResult } = require('express-validator');
    const Router = require("express").Router();
    const conntrollerAdmin = require("../controllers/admin.controller");
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

    ],conntrollerAdmin.loginAdmin);

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
    ],conntrollerAdmin.registerAdmin);

    Router.route("/").get(middleWare.superAdmin,conntrollerAdmin.getAdmin);
    Router.route("/delete/:idAdmin").delete(middleWare.superAdmin,conntrollerAdmin.deleteAdmin);
    Router.route("/update/:idAdmin").put(middleWare.superAdmin,conntrollerAdmin.updateAdmin);
    

    app.use("/admin", Router);
}