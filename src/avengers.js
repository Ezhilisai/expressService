const mongoose = require('mongoose');

const avengersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    NickName: String
});

module.exports = mongoose.model('Avengers', avengersSchema);