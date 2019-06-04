const mongoose = require('mongoose');

const rankSchema = mongoose.Schema({
    id_usuario: { type: Number, required: true },
    num_vit: { type: Number, required: true, default: 0 },
    num_der: { type: Number, required: true, default: 0 }
})

module.exports = mongoose.model('Rank', rankSchema);