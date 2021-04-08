const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PanierSchema = new Schema({
    
    idProduit: {
        type: Schema.Types.ObjectId,
        ref: 'Produit'
    },
    idClient: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    Quantite: {
        type: Number,
        required: true,
        trim: true,
    },

}, {
    versionKey: false
});

module.exports = mongoose.model('Panier', PanierSchema);