import { NextResponse } from "next/server";
import connectMongoDb from "@/app/libs/mongodb";
import UserModel from "@/app/models/userSchema";
import jwt from "jsonwebtoken";

export async function POST(request) {
    const { username, password, email, firstName, lastName } = await request.json();

    await connectMongoDb();

    // Generate an access token
    const accessToken = jwt.sign({ username }, "your-secret-key");

    await UserModel.create({
        username,
        password,
        email,
        firstName,
        lastName,
        accessToken, // Save the access token in the user document
    });

    return NextResponse.json({ message: "User Created", accessToken }, { status: 201 });
}
