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
  try {
    const body: ContactFormData = await req.json();
    
    const { name, email, company, phone, projectType, budget, timeline, message } = body;

    if (!name || !email || !message || !projectType) {
      return NextResponse.json(
        { error: 'Name, email, project type, and message are required' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'induwaragallaba@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: emailTemplate,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
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
    };

    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}