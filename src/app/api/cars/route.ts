import { NextResponse } from "next/server";
import connectMongoDb from "@/app/libs/mongodb";
import CarModel from "@/app/models/carsSchema"

export async function POST(params: any) {
    const { id, name, description, power_PS } = await params.json()

    await connectMongoDb();
    
    await CarModel.create({ id, name, description, power_PS });
    await CarModel.updateMany({}, { $set: { power_PS } }); // Add power_PS field to all documents
    return NextResponse.json({ message: "Car Created" }, { status: 201 })
}





export async function GET(params: any) {
    await connectMongoDb();
    const cars = await CarModel.find()
    return NextResponse.json({ cars })
}

export async function DELETE(params: any) {
    const id = params.nextUrl.searchParams.get("id")
    await connectMongoDb();
    await CarModel.findByIdAndDelete(id)
    return NextResponse.json({ message: "Car Deleted" }, { status: 200 })
}  