import { NextResponse } from "next/server";
import connectMongoDb from "@/app/libs/mongodb";
import CarModel from "@/app/models/carsSchema"

export async function POST(params: any) {
    const { name, description } = await params.json()
    await connectMongoDb();
    await CarModel.create({ name, description });
    //return NextResponse.json("Email sent");
    return NextResponse.json({ message: "Api is working correctly !" }, { status: 201 })
}