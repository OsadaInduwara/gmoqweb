import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();
    
    const { name, email, company, phone, projectType, budget, timeline, message } = body;

    if (!name || !email || !message || !projectType) {
      return NextResponse.json(
        { error: 'Name, email, project type, and message are required' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const emailTemplate = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    <p><strong>Project Type:</strong> ${projectType}</p>
    ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
    ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
    
    <hr>
    <p><em>This message was sent from the GMOQAI contact form.</em></p>
    `;

    console.log('Attempting to send notification email with API key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
    
    // Send notification email
    const notificationResult = await resend.emails.send({
      from: 'GMOQAI Contact <noreply@gmoqai.com>',
      to: 'induwaragallaba@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: emailTemplate,
      reply_to: email,
    });

    console.log('Notification email result:', notificationResult);

    if (notificationResult.error) {
      console.error('Failed to send notification email:', JSON.stringify(notificationResult.error, null, 2));
      throw new Error(`Failed to send notification email: ${JSON.stringify(notificationResult.error)}`);
    }

    // Send auto-reply email
    const autoReplyResult = await resend.emails.send({
      from: 'GMOQAI Team <noreply@gmoqai.com>',
      to: email,
      subject: 'Thank you for contacting GMOQAI',
      html: `
      <h2>Thank you for reaching out to GMOQAI!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and our team will get back to you within 24 hours.</p>
      
      <h3>Your submission details:</h3>
      <p><strong>Project Type:</strong> ${projectType}</p>
      ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
      ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
      
      <p>In the meantime, feel free to explore our services and previous work on our website.</p>
      
      <p>Best regards,<br>
      The GMOQAI Team<br>
      <a href="mailto:hello@gmoqai.com">hello@gmoqai.com</a></p>
      `,
    });

    console.log('Auto-reply email result:', autoReplyResult);

    if (autoReplyResult.error) {
      console.error('Failed to send auto-reply email:', JSON.stringify(autoReplyResult.error, null, 2));
      // Don't throw here - notification was sent successfully
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Provide more specific error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { error: 'Failed to send email', details: errorMessage },
      { status: 500 }
    );
  }
}