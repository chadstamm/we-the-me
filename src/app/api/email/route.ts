import { NextRequest, NextResponse } from 'next/server';

interface EmailRequest {
  email: string;
  firstName?: string;
  document: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EmailRequest;

    if (!body.email || !body.document) {
      return NextResponse.json(
        { success: false, error: 'Email and document are required' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom =
      process.env.EMAIL_FROM || 'We The Me <onboarding@resend.dev>';

    if (resendApiKey) {
      // Send via Resend
      const { Resend } = await import('resend');
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: emailFrom,
        to: body.email,
        subject: `Your Personal Constitution${body.firstName ? `, ${body.firstName}` : ''}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a1a2e; font-size: 24px; text-align: center;">Your Personal Constitution</h1>
            <p style="color: #3a3a5e; line-height: 1.6;">
              ${body.firstName ? `Dear ${body.firstName},` : 'Hello,'}
            </p>
            <p style="color: #3a3a5e; line-height: 1.6;">
              Thank you for taking the time to reflect on your values, purpose, and commitments. Your Personal Constitution is attached below.
            </p>
            <hr style="border: none; border-top: 1px solid #c8a26e; margin: 20px 0;" />
            <div style="color: #1a1a2e; line-height: 1.8; white-space: pre-wrap;">${body.document}</div>
            <hr style="border: none; border-top: 1px solid #c8a26e; margin: 20px 0;" />
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">
              Created with <a href="https://wetheme.app" style="color: #c8a26e;">We The Me</a>
            </p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, method: 'resend' });
    }

    // Fallback: log the email
    console.log('Email would be sent to:', body.email);
    console.log('Document length:', body.document.length, 'characters');

    return NextResponse.json({ success: true, method: 'logged' });
  } catch (error) {
    console.error('Email API error:', error);

    const message =
      error instanceof Error ? error.message : 'Failed to send email';

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
