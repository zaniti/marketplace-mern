const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VendeurSchema = new Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    prenom: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true

    },
    password: {
        type: String,
        select: false,
        required: true,
        trim: true,
        minlength: 3
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    type: {
        type: String,
        enum: ['Starter', 'Pro','Expert'],
        default: 'Starter'
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active','Suspended'],
        default: 'Pending'
      },
    fichierAdministratif : {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    chiffreAffaires: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    produits: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
    },
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Vendeur', VendeurSchema);