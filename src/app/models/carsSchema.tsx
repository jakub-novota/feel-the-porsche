import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the car document
interface CarDocument extends Document {
    name: string;
    description: string;
}

// Define the car schema
const carSchema = new Schema<CarDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

// Create and export the Car model
const CarModel = mongoose.models.Car || mongoose.model<CarDocument>('Car', carSchema);
export default CarModel