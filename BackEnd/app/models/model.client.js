const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClientSchema = new Schema({
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
        select: false,
        required: true,
        trim: true,
        minlength: 3
    },
    adresse: {
        type: String,
        select: false,
        required: true,
        trim: true,
        minlength: 3
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
    confirmationCode: { 
        type: String, 
        unique: true 
    },
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Client', ClientSchema);