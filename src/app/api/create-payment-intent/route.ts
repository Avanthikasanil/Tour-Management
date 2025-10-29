import { NextResponse } from "next/server";
import { stripe, formatAmountForStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { amount, tourId } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount),
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      metadata: { tourId },
    });
    console.log(paymentIntent, '------result');
    

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Error creating payment intent" },
      { status: 500 }
    );
  }
}
