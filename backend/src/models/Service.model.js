import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true, default: 60 }, // Duración en minutos
  price: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, required: true, default: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Service", serviceSchema);
