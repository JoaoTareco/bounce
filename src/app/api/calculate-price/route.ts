import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {

    const body = await req.json();

    if (!body) {
      return new NextResponse("Number of bags is required", { status: 400 });
    }

    // Ideally this is not hardcoded and comes from the DB
    const price_per_bag = 5.9;

    // Calculate price
    // Having this in BE allows for more logic for when price doesn't increase linearly
    const price = body.number * price_per_bag;

    // Return calculated price with only 2 decimal places
    return NextResponse.json((Math.round(price * 100) / 100).toFixed(2));
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
