import DbConnect from "@/Services/DbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const db = await DbConnect();
        const ordersCollection = db.collection("order");
        let sortMode = 1;
        const sortingMode = request.nextUrl.searchParams.get("sortingMode");
        const sort = request.nextUrl.searchParams.get("sort");
        // console.log(sortingMode,"12");
        if (sortingMode == "Descending") {
            sortMode = -1;
        }
        if(sort == "Name"){
        const result = await ordersCollection
            .find()
            .sort({ product: sortMode })
            .toArray();
        return NextResponse.json(result);
        }else{
            const result = await ordersCollection
            .find()
            .sort({ timestamp: sortMode })
            .toArray();
            return NextResponse.json(result);
        }
    } catch (error) {
        console.error("error for getting data", error);
        NextResponse.json({ error: "error for getting data" });
    }
};

export const DELETE = async (request) => {
    if (request.method === "DELETE") {
        try {
            const body = await request.json();
            console.log(body);
            const query = { _id: new ObjectId(body._id) };
            const db = await DbConnect();
            const ordersCollection = db.collection("order");
            const result = await ordersCollection.deleteOne(query);
            return NextResponse.json(result);
        } catch (error) {
            console.error("Error deleting a review!", error);
            return NextResponse.json({
                error: error.message || "Failed to delete data",
            });
        }
    } else {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 }
        );
    }
};
