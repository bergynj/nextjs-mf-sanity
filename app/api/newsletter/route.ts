import { Resend } from "resend";
import { env } from "@/lib/env";

const resend = !env.DISABLE_RESEND && env.RESEND_API_KEY 
  ? new Resend(env.RESEND_API_KEY) 
  : null;

export const POST = async (request: Request) => {
  const { email } = await request.json();

  // Check if Resend is disabled or not properly configured
  if (env.DISABLE_RESEND || !resend || !env.RESEND_AUDIENCE_ID) {
    return Response.json(
      { error: "Newsletter subscription is currently unavailable" },
      { status: 503 }
    );
  }

  // Create contact
  try {
    resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: env.RESEND_AUDIENCE_ID,
    });

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: "Error subscribing to updates" },
      { status: 400 }
    );
  }
};
