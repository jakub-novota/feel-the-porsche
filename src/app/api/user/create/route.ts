import { NextResponse } from "next/server";
import connectMongoDb from "@/app/libs/mongodb";
import UserModel from "@/app/models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: any) {
    const { username, password, email, firstName, lastName } = await request.json();

    await connectMongoDb();
    const secret = process.env.JWT_SECRET!;
    // Generate an access token
    const accessToken = jwt.sign({ username }, secret);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
        accessToken, // Save the access token in the user document
    });

    return NextResponse.json({ message: "User Created", accessToken }, { status: 201 });
}