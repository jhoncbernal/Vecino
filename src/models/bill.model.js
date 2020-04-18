const mongoose = require("mongoose");
const { Schema } = mongoose;

let ProductSchema = new Schema({
  productName: {
    type: String,
    required: [
      true,
      'What is the name of the product? ["Soap", "Rice", "Pills"]',
    ],
  },
  measureType: {
    type: String,
    required: [
      true,
      'What kind of measure has the product? ["Lb", "Kg", "Und"]',
    ],
  },
  quantity: { type: Number, required: true },
  urlImage: { type: String, required: true },
  price: { type: Number, required: true },
  salving: { type: Number },
});
const BillSchema = new Schema(
  {
    billType: {
      type: String,
      required: [
        true,
        'What kind of bill is? ["Reg Simplificado", "Reg Comun"]',
      ],
    },
    valueDelivery: { type: Number, required: true },
    MethodOfPayment: { type: String, lowercase: true, required: true },
    subTotal: { type: Number, required: true },
    Total: { type: Number, required: true },
    cashValue: { type: Number },
    change: { type: Number },
    enabled: { type: Boolean, default: true },
    products: [ProductSchema],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      autopopulate: {
        select: [
          "firstName",
          "phone",
          "email",
          "homeNumber",
          "blockNumber",
          "neighborhood",
        ],
      },
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "provider",
      required: true,
      autopopulate: { select: ["firstName", "documentId", "address"] },
    },
  },
  { timestamps: true }
);

BillSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("bill", BillSchema);
