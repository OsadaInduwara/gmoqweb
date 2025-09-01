import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
  console.log('=== CONTACT FORM API CALLED ===');
  
  try {
    const body: ContactFormData = await req.json();
    console.log('Form data received:', body);
    
    const { name, email, company, phone, projectType, budget, timeline, message } = body;

    if (!name || !email || !message || !projectType) {
      console.log('Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'Name, email, project type, and message are required' },
        { status: 400 }
      );
    }

    // Use Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'induwaragallaba@gmail.com', // Your Gmail
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
      },
    });

    const emailTemplate = `
    <h2>New Contact Form Submission - GMOQAI</h2>
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
    <p><em>This message was sent from the GMOQAI website contact form.</em></p>
    `;

    console.log('Sending email to your Gmail...');

    // Send email to yourself
    await transporter.sendMail({
      from: '"GMOQAI Website" <induwaragallaba@gmail.com>',
      to: 'induwaragallaba@gmail.com',
      subject: `New Contact Form: ${name} - ${projectType}`,
      html: emailTemplate,
      replyTo: email,
    });

    console.log('=== EMAIL SENT SUCCESSFULLY ===');

    return NextResponse.json(
      { message: 'Message sent successfully! We will get back to you soon.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('=== EMAIL SENDING ERROR ===');
    console.error('Error details:', error);
    
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}