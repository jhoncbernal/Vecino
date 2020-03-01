const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
    codigo:     { type: String },
    "concepto contable":{ type: String },
    nombre:     { type: String },
    _1_30:	    { type: String },
    _31_60:	    { type: String },
    _61_90:	    { type: String },
    _mas_90:    { type: String },
    total:      { type: String },
});

module.exports = mongoose.model('file', FileSchema);