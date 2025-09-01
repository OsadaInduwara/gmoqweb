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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

// Main function handler - handles all HTTP methods
export default async function(context: any) {
  const { request, env } = context;
  const method = request.method;

  console.log(`${method} request received for contact endpoint`);

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Handle GET for testing
  if (method === 'GET') {
    return new Response(JSON.stringify({
      message: 'Contact endpoint is working',
      methods: ['GET', 'POST', 'OPTIONS']
    }), {
      status: 200,
      headers: corsHeaders
    });
  }

  // Handle POST for form submission
  if (method === 'POST') {
    try {
      console.log('Contact form submission received');
      console.log('Request method:', request.method);
      console.log('Request headers:', Object.fromEntries(request.headers));
      
      const body: ContactFormData = await request.json();
      console.log('Request body:', body);
      
      const { name, email, company, phone, projectType, budget, timeline, message } = body;

    if (!name || !email || !message || !projectType) {
      return new Response(JSON.stringify({
        error: 'Name, email, project type, and message are required'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

      if (!env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not configured');
        return new Response(JSON.stringify({
          error: 'Email service not configured'
        }), {
          status: 500,
          headers: corsHeaders
        });
      }

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

      console.log('Attempting to send notification email with API key:', env.RESEND_API_KEY ? 'Present' : 'Missing');
    
    // Send notification email
    const notificationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'GMOQAI Contact <noreply@gmoqai.com>',
        to: 'induwaragallaba@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: emailTemplate,
        reply_to: email,
      }),
    });

    const notificationResult = await notificationResponse.json();
    console.log('Notification email result:', notificationResult);

    if (!notificationResponse.ok) {
      console.error('Failed to send notification email:', notificationResult);
      throw new Error(`Failed to send notification email: ${JSON.stringify(notificationResult)}`);
    }

    // Send auto-reply email
    const autoReplyResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    });

    const autoReplyResult = await autoReplyResponse.json();
    console.log('Auto-reply email result:', autoReplyResult);

    if (!autoReplyResponse.ok) {
      console.error('Failed to send auto-reply email:', autoReplyResult);
      // Don't throw here - notification was sent successfully
    }

      return new Response(JSON.stringify({
        message: 'Email sent successfully'
      }), {
        status: 200,
        headers: corsHeaders
      });

    } catch (error) {
      console.error('Error sending email:', error);
      
      // Provide more specific error information
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      return new Response(JSON.stringify({
        error: 'Failed to send email',
        details: errorMessage
      }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }

  // Method not allowed
  return new Response(JSON.stringify({
    error: 'Method not allowed'
  }), {
    status: 405,
    headers: corsHeaders
  });
}