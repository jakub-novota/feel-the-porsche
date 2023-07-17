import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the user document
interface UserDocument extends Document {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the user schema
const userSchema = new Schema<UserDocument>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    accessToken: { type: String, required: true },
}, {
    timestamps: true
});

// Create and export the User model
const UserModel = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
export default UserModel;