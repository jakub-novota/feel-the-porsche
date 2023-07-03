import connectMongoDb from "@/app/libs/mongodb";
import CarModel from "@/app/models/carsSchema"
import { NextResponse } from "next/server";


export async function PUT(request: any, { params }: any) {
    const { id } = params;
    const { newName: name, newDescription: description } = await request.json()
    await connectMongoDb()
    await CarModel.findByIdAndUpdate(id, { name, description });
    return NextResponse.json({ message: "Car Updated" }, { status: 200 })
}

export async function GET(request: any, { params }: any) {
    const { id } = params;
    await connectMongoDb()
    const car = await CarModel.findOne({ _id: id })
    return NextResponse.json({ car }, { status: 200 })
}

