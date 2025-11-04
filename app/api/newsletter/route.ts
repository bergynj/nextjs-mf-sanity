import { Resend } from "resend";

const isResendDisabled = process.env.DISABLE_RESEND === "true";
const resend = !isResendDisabled ? new Resend(process.env.RESEND_API_KEY) : null;

export const POST = async (request: Request) => {
  const { email } = await request.json();

  // Check if Resend is disabled or not properly configured
  if (isResendDisabled || !resend) {
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
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: "Error subscribing to updates" },
      { status: 400 }
    );
  }
};
