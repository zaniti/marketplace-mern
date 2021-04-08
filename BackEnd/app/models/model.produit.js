const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProduitSchema = new Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    prix: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    quantite: {
        type: Number,
        required: true,
        trim: true
    },
    photo : {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    date : {
        type: Date,
        required: true,
        trim: true,
        default: Date.now,
    },
    idCategorie : {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    idVendeur : {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Produit', ProduitSchema);