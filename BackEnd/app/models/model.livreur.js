const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LivreurSchema = new Schema({
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
    type: {
        type: String,
        required: true,
        trim: true,
    },



},
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Livreur', LivreurSchema);