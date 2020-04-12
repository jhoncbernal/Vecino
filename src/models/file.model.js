const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
    codigo: { type: String, unique: true, index: true },
    nombre: { type: String },
    _1_30: { type: String },
    _31_60: { type: String },
    _61_90: { type: String },
    _mas_90: { type: String },
    total: { type: String, index: true }
}, { timestamps: true });
module.exports = mongoose.model('portafolio', FileSchema);