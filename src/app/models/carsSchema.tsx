import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the car document
interface CarDocument extends Document {
    id: number;
    name: string;
    power_PS: number;
    power_HP: number;
    max_speed: number;
    transmission: string;
    acceleration: number;
    year: number;
    capacity: number;
    drive: string;
    description: string;
    cylinder_capacity: number;
    model: string;
    body: string;
    mileage: number;
    fuel: string;
    image: string;
    image_cars: Record<string, string>;
    gallery: Record<string, string>;
}

// Define the car schema
const carSchema = new Schema<CarDocument>({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    power_PS: { type: Number, required: true },
});

// Create and export the Car model
const CarModel = mongoose.models.Car || mongoose.model<CarDocument>('Car', carSchema);
export default CarModel