import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the car document
interface DataCocument extends Document {
    name: string;
    text: string;
}
// Define the car schema
const dataSchema = new Schema<DataCocument>({
    name: { type: String, required: true },
    text: { type: String, required: true },
}, {
    timestamps: true
}
);

// Create and export the Car model
const DataModel = mongoose.models.Data || mongoose.model<DataCocument>('Data', dataSchema);
export default DataModel