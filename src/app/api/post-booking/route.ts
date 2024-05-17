import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function POST(
  req: Request
) {
  try {

    const body = await req.json();

    if (!body) {
      return new NextResponse("Form Values are required", { status: 400 });
    }

    // Create customer in DB for logging
    // Improvement: create customer only if doesn't exist
    await prismadb.customers.create({
      data: {
        email: body.email,
      },
    })

    // Get the customer ID for table mappings
    const customer_id = await prismadb.customers.findFirst({
      where: {
        email: body.email 
      },
    });

    // Simulate a 50% chance of failure 
    // Here would go payment processing
    const success = Math.random() > 0.5;

    // Create booking in DB for logging
    await prismadb.bookings.create({
      data: {
        location: body.location,
        price_payed: Number(body.price),
        number_bags: body.number,
        customer: customer_id?.id,
        status: success ? 'SUCCESS' : 'FAILED',
      },
    })

    // Return success or failure
    return NextResponse.json(success);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};
