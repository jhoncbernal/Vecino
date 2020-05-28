const mongoose = require("mongoose");
const { Schema } = mongoose;

const FileSchema = new Schema(
  {
    Nombres: { type: String ,lowercase:true},
    Apellidos: { type: String ,lowercase:true},
    Correo: { type: String },
    Telefono: { type: Number },
    Identificacion: { type: Number },
    Apartamento: { type: Number },
    Torre: { type: Number },
    Propietario: { type: String, default: "no" ,lowercase:true},
    Uniquecode: { type: String },
    Ciudad: { type: String },
    codigo: { type: String },
    nombre: { type: String },
    _1_30: { type: String },
    _31_60: { type: String },
    _61_90: { type: String },
    _mas_90: { type: String },
    total: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("portafolio", FileSchema);
