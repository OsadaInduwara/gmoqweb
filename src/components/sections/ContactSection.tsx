'use client';

import { useState } from 'react';

// Simple icons
const Mail = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 7L12 13L22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7Z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 13L12 21" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 7L17 11" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 7L7 11" />
    <circle cx="12" cy="7" r="1.5" fill="currentColor" />
  </svg>
);

const Phone = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.5 3H9.5C8.11929 3 7 4.11929 7 5.5V18.5C7 19.8807 8.11929 21 9.5 21H14.5C15.8807 21 17 19.8807 17 18.5V5.5C17 4.11929 15.8807 3 14.5 3Z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 21V18" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 21V18" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6H12.01" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 9C21 9 20 10 20 12C20 14 21 15 21 15" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 7C23 7 21.5 9 21.5 12C21.5 15 23 17 23 17" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9C3 9 4 10 4 12C4 14 3 15 3 15" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M1 7C1 7 2.5 9 2.5 12C2.5 15 1 17 1 17" />
  </svg>
);

const Send = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 12L22 2L15 22L11 13L2 12Z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 2L11 13" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 13L8 20L5 15" />
    <circle cx="2" cy="22" r="1.5" fill="currentColor" />
  </svg>
);

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email anytime',
    contact: 'hello@gyrixai.com',
    action: 'mailto:hello@gyrixai.com'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Mon-Fri from 9am to 6pm',
    contact: '+94 70 143 3563',
    action: 'tel:+94701433563'
  }
];

const projectTypes = [
  'Custom Software Development',
  'AI & Machine Learning',
  'Web Application',
  'Mobile App Development',
  'Data Analytics',
  'Consultation Only',
  'Other'
];

const budgetRanges = [
  'Under $10K',
  '$10K - $25K',
  '$25K - $50K',
  '$50K - $100K',
  '$100K+',
  'Let&apos;s Discuss'
];

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form directly to Formspree...');

      // Submit directly to Formspree (forwards to your Gmail)
      const response = await fetch('https://formspree.io/f/xanyrnok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          company: formData.company || 'Not specified',
          phone: formData.phone || 'Not specified',
          projectType: formData.projectType,
          budget: formData.budget || 'Not specified',
          timeline: formData.timeline || 'Not specified',
          message: formData.message,
          _replyto: formData.email,
          _subject: `GyrixAI Contact Form: ${formData.name} - ${formData.projectType}`
        }),
      });

      console.log('Formspree response status:', response.status);

      if (response.ok) {
        console.log('Form submitted successfully!');
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        });
      } else {
        console.error('Formspree error:', response.status);
        setSubmitStatus('error');
      }
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        {/* Header */}
        <div className="text-center mb-section">
          <span className="section-divider-text">Let&apos;s Talk</span>

          <h2 className="text-primary mb-large">
            Let&apos;s Start Your Next Project
          </h2>

          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Ready to transform your business with cutting-edge technology?
            We&apos;d love to hear about your project and discuss how we can help.
          </p>
        </div>

        <div className="grid-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-medium">
                Get in Touch
              </h3>
              <p className="text-secondary mb-large leading-relaxed">
                Whether you have a specific project in mind or just want to explore possibilities,
                we&apos;re here to help. Reach out to us through any of the channels below, and let&apos;s
                start a conversation about your next big idea.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="flex flex-col gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="contact-info-item group cursor-pointer">
                    <div className="icon-wrapper">
                      <Icon />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary mb-1">
                        {info.title}
                      </h4>
                      <p className="text-sm text-secondary mb-small">
                        {info.description}
                      </p>
                      <a
                        href={info.action}
                        className="text-sm font-bold text-purple-700 hover:text-purple-900 transition-colors duration-200"
                      >
                        {info.contact}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="card">
              <h3 className="text-xl font-bold text-primary mb-medium">Send us a Message</h3>
              {submitStatus === 'success' && (
                <div className="status-message status-success">
                    <p>
                    Thank you! Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="status-message status-error">
                    <p>
                    Sorry, there was an error sending your message. Please try again or contact us directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Company and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">
                      Company
                    </label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Project Type and Budget */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div className="form-group">
                  <label className="form-label">
                    Timeline
                  </label>
                  <input
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    placeholder="When do you need this completed?"
                    className="form-input"
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="form-textarea"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message
                      <Send />
                    </>
                  )}
                </button>

                <p className="text-xs text-secondary text-center opacity-70">
                  By submitting this form, you agree to our privacy policy. We&apos;ll never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
