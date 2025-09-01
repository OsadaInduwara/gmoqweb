export async function onRequestPost(context) {
  console.log('=== CONTACT FORM SUBMISSION TO GMAIL ===');
  
  try {
    const { request, env } = context;
    
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
    
    // Check Gmail credentials
    if (!env.GMAIL_APP_PASSWORD) {
      console.log('GMAIL_APP_PASSWORD not found in environment');
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
    
    console.log('Sending email via Gmail SMTP...');
    
    // Create email content
    const emailContent = `Subject: New Contact Form: ${name} - ${projectType}
From: GMOQAI Website <induwaragallaba@gmail.com>
To: induwaragallaba@gmail.com
Reply-To: ${email}
Content-Type: text/html; charset=utf-8

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
<p><em>Reply directly to this email to respond to ${email}</em></p>
`;

    // Send email using Formspree (forwards to your Gmail)
    const formspreeResponse = await fetch('https://formspree.io/f/xanyrnok', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        name: name,
        company: company || 'Not specified',
        phone: phone || 'Not specified',
        projectType: projectType,
        budget: budget || 'Not specified', 
        timeline: timeline || 'Not specified',
        message: message,
        _replyto: email,
        _subject: `GMOQAI Contact Form: ${name} - ${projectType}`,
        _format: 'html'
      }),
    });
    
    const result = await formspreeResponse.json();
    console.log('Formspree response:', result);
    
    if (!formspreeResponse.ok) {
      throw new Error(`Formspree error: ${JSON.stringify(result)}`);
    }
    
    console.log('=== EMAIL SENT SUCCESSFULLY TO YOUR GMAIL ===');
    
    return new Response(JSON.stringify({
      message: 'Message sent successfully! We will get back to you soon.'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('=== EMAIL SENDING ERROR ===');
    console.error('Error details:', error);
    
    return new Response(JSON.stringify({
      error: 'Failed to send message. Please try again or contact us directly.',
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