import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { accessibleRecordsPlugin } from "@casl/mongoose";

const petSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  photo: { type: String, ref: "File" },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  temperament: { type: String, required: true },
  bio: { type: String, required: true },
  owners: [{ type: String, ref: "User", required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
petSchema.plugin(accessibleRecordsPlugin);
const Pet = model("Pet", petSchema);

export  {Pet, petSchema};
