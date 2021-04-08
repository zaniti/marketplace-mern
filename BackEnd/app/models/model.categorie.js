const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorieSchema = new Schema({
    nom: {
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

module.exports = mongoose.model('Categorie', CategorieSchema);