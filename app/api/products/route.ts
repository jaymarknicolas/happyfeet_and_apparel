import { NextResponse } from "next/server";


import prisma from "@/lib/prisma";


export async function GET(): Promise<NextResponse> {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                product_id: "desc", // Adjust this to the appropriate timestamp field (e.g., "updatedAt")
            },
        });
        return NextResponse.json({ data: products }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}


export async function POST(req: Request): Promise<NextResponse> {
    try {
        const data = await req.json();

        // Create a new product in the database
        const newProduct = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                category_id: data.category_id,
                barcode: data.barcode,
                quantity_in_stock: data.quantity_in_stock,
                reorder_level: data.reorder_level,
                unit_price: data.unit_price,
                cost_price: data.cost_price,
                supplier_id: data.supplier_id,
                date_of_entry: data.date_of_entry,
                size: data.size,
                color: data.color,
                material: data.material,
                style_design: data.style_design,
                product_image: data.product_image,
                dimensions: data.dimensions,
                weight: data.weight,
                brand: data.brand,
                season: data.season,
                expiration_date: data.expiration_date,
                status: data.status,
                location: data.location,
                discount: data.discount,
            },
        });

        return NextResponse.json({ data: newProduct }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error) }, { status: 500 });
    }
}
