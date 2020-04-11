const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    productType:    { type: String, required: [true, 'What kind of product is? ["Cleaning", "food", "Health"]'] },
    productName:    { type: String, required: [true, 'What is the name of the product? ["Soap", "Rice", "Pills"]']},
    code:           { type: Number, unique: true, index: true },
    brand:          { type: String, lowercase: true },
    freatures:      { type: String, required: true },
    price:          { type: Number, required: true },
    urlImage:       { type: String, required: true},
    keyImage:       { type: String, required: true},
    enabled:        { type: Boolean, default: true },
    promotionPrice: { type: Number, required: true },
    promotionToken: { type: String, required: false },
    promotionExpires: { type: Date, required: false },
    totalAmount:    { type: Number },
    messureType:    { type: String,required: [true, 'What kind of measure has the product? ["Lb", "Kg", "Und"]'] },
    provider: {
        type: Schema.Types.ObjectId,
        ref: "provider",
        autopopulate: {
            select: [
                'companyName',
                'address',
                'phone']
        }
    }
}, { timestamps: true });


ProductSchema.plugin(require("mongoose-autopopulate"))
module.exports = {
    Product: mongoose.model('vehicle', ProductSchema),
    Product: ProductSchema
}