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
    power_PS: { type: Number, required: true },
    power_HP: { type: Number, required: true },
    max_speed: { type: Number, required: true },
    transmission: { type: String, required: true },
    acceleration: { type: Number, required: true },
    year: { type: Number, required: true },
    capacity: { type: Number, required: true },
    drive: { type: String, required: true },
    description: { type: String, required: true },
    cylinder_capacity: { type: Number, required: true },
    model: { type: String, required: true },
    body: { type: String, required: true },
    mileage: { type: Number, required: true },
    fuel: { type: String, required: true },
    image: { type: String, required: true },
    image_cars: { type: Map, of: String, required: true },
    gallery: { type: Map, of: String, required: true },
});

// Create and export the Car model
const CarModel = mongoose.models.Car || mongoose.model<CarDocument>('Car', carSchema);
export default CarModel