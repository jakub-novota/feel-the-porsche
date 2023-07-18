import { NextResponse } from "next/server";
import connectMongoDb from "@/app/libs/mongodb";
import DataModel from "@/app/models/dataSchema";



export async function POST(request: any) {
    const { name, text } = await request.json();

    try {
        await connectMongoDb();
        await DataModel.create({
            name,
            text
        });

        return NextResponse.json({ message: "Post Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}


export async function GET(request: any) {
    const name = request.nextUrl.searchParams.get("name");
    const id = request.nextUrl.searchParams.get("id");

    try {
        await connectMongoDb();

        let query = {};

        if (name) {
            query = { name };
        } else if (id) {
            query = { _id: id };
        }

        // If neither name nor id parameter is provided, return all data
        if (!name && !id) {
            const allData = await DataModel.find();
            return NextResponse.json(allData, { status: 200 });
        }

        const data = await DataModel.find(query);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}



export async function PUT(request: any) {
    const id = request.nextUrl.searchParams.get("id");
    const updatedData = await request.json();

    try {
        await connectMongoDb();
        const car = await DataModel.findByIdAndUpdate(id, updatedData, { new: true });


        if (!updatedData) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post updated", data: updatedData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(request: any) {
    const id = request.nextUrl.searchParams.get("id");
    try {
        await connectMongoDb();

        const deletedData = await DataModel.findByIdAndDelete(id);

        if (!deletedData) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post deleted", data: deletedData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
