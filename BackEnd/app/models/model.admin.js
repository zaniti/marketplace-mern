const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
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
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Admin', AdminSchema);