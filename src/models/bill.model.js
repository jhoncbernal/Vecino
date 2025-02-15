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
    deliveryCharge: { type: Number, required: true },
    deliveryExtraCharge: { type: Number, required: false, default: 0 },
    MethodOfPayment: { type: String, lowercase: true, required: true },
    subTotal: { type: Number, required: true },
    DeliverySchedule: { type: String, lowercase: true, required: true },
    Total: { type: Number, required: true },
    cashValue: { type: Number },
    tip: { type: Number },
    change: { type: Number },
    enabled: { type: Boolean, default: true },
    states: [
      { _id : false,
        start: {
          type: String,
          default: new Date().toLocaleString("en-US", {
            timeZone: "America/Bogota",
          }),
        },
        state: { type: String, lowercase: true, required: true },
      },
    ],
    code: { type: String, required: true, unique: true, index: true },
    otherAddress: { type: String },
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
          "address"
        ],
      },
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "provider",
      required: true,
      autopopulate: { select: ["firstName", "documentId", "address","schedule","deliveryCharge","deliveryExtraCharge","billType"] },
    },
  },
  { timestamps: true }
);

BillSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("bill", BillSchema);
