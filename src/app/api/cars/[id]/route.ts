import connectMongoDb from "@/app/libs/mongodb";
import CarModel from "@/app/models/carsSchema"
import { NextResponse } from "next/server";


export async function PUT(request: Request, { params }: any) {
    const { id } = params;
    const updatedData = await request.json();

    await connectMongoDb();

    try {
        const car = await CarModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!car) {
            return NextResponse.json({ message: "Car not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Car Updated", car }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating car" }, { status: 500 });
    }
}


export async function GET(request: any, { params }: any) {
    const { id } = params;
    await connectMongoDb()
    const car = await CarModel.findOne({ _id: id })
    return NextResponse.json({ car }, { status: 200 })
}

