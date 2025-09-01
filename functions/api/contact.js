export async function onRequestPost(context) {
  console.log('=== CONTACT FORM SUBMISSION STARTED ===');
  
  try {
    const { request, env } = context;
    console.log('Request method:', request.method);
    
    // Parse form data
    const formData = await request.json();
    console.log('Form data received:', formData);
    
    const { name, email, company, phone, projectType, budget, timeline, message } = formData;
    
    // Validate required fields
    if (!name || !email || !message || !projectType) {
      console.log('Validation failed - missing required fields');
      return new Response(JSON.stringify({
        error: 'Name, email, project type, and message are required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Check API key
    if (!env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY not found in environment');
      return new Response(JSON.stringify({
        error: 'Email service not configured'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    console.log('API key found, sending email...');
    
    // Send email using fetch
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'GMOQAI Contact <noreply@gmoqai.com>',
        to: 'induwaragallaba@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
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
        `,
        reply_to: email,
      }),
    });
    
    const emailResult = await emailResponse.json();
    console.log('Email API response:', emailResult);
    
    if (!emailResponse.ok) {
      console.log('Email sending failed:', emailResult);
      throw new Error(`Email failed: ${JSON.stringify(emailResult)}`);
    }
    
    console.log('=== EMAIL SENT SUCCESSFULLY ===');
    
    return new Response(JSON.stringify({
      message: 'Email sent successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('=== ERROR IN CONTACT FUNCTION ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    
    return new Response(JSON.stringify({
      error: 'Failed to send email',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}