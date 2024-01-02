import { db } from "@/lib/db";
import { userSubscriptions } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const return_url = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const _userSubscriptions = await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId, userId));
    if (_userSubscriptions[0] && _userSubscriptions[0].stripeSubscriptionId) {
      //trying to cancel
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: _userSubscriptions[0].stripeCustomerId,
        return_url: return_url,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    //trying to subscribe
    const stripeSession = await stripe.checkout.sessions.create({
      metadata: {
        userId: userId,
      },
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "ChatPDF Pro",
              description: "Unlimited PDF Sessions",
            },
            unit_amount: 1000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: return_url,
      cancel_url: return_url,
      billing_address_collection: "auto",
      customer_email: user?.emailAddresses[0].emailAddress,
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error(error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
