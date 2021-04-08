const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const superAdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        select: false,
        required: true,
        trim: true,
        minlength: 3
    },
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model('superAdmin', superAdminSchema);