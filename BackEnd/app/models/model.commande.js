const mongoose = require('mongoose');
const { isNumber } = require('util');
const Schema = mongoose.Schema;
const CommandeSchema = new Schema({
    status: {
        type: String,
        required: true,
        trim: true,
        default: "attente"
    },
    Produits:[{ 
            type : Schema.Types.ObjectId,
            ref: 'Produit' ,
            }],
    Quantite : [{
            type: Number,
        trim: true,

        }],
    idClient: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    DateLivraison: [{
        type: String,
        trim: true,
        default: null,
    }],
    idLivreur: {
        type: String,
        trim: true,
        default: null,
    },
    FullName: {
        type: String,
        trim: true,
    },
    adresse: {
        type: String,
        trim: true,
    },
    Phone: {
        type: Number,
        trim: true,
    },
    PrixTotal: [{
        type: Number,
        trim: true,
    }],

}, {
    versionKey: false
});

module.exports = mongoose.model('Commande', CommandeSchema);