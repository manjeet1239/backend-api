const mongoose = require('mongoose');

const importantSchema = new mongoose.Schema({
    sos: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('sos', importantSchema) 