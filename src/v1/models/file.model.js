const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const FileSchema = new Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    Nombres: { type: String, lowercase: true },
    Apellidos: { type: String, lowercase: true },
    Correo: {
      type: String,
      unique: function () {
        return this.Nombres;
      },
      lowercase: true,
    },
    Telefono: { type: Number },
    Identificacion: {
      type: Number,
      unique: function () {
        return this.Nombres;
      },
    },
    Apartamento: { type: Number },
    Torre: { type: Number },
    Propietario: { type: String, default: "no", lowercase: true },
    CodigoUnico: { type: String },
    CodigoPostal: { type: String },
    Direccion: { type: String },
    CodigoPais: { type: String },
    CodigoEstado: { type: String },
    NombreCiudad: { type: String },
    CodigoCiudad: { type: String },
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
