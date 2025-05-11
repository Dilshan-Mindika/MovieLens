
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useMovieContext } from '../context/MovieContext';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field when editing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: '',
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Submitting...',
    });
    
    // Simulate API call with timeout
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message! We will get back to you soon.',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-movie-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/80">
              Have questions, feedback, or just want to say hello? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We're here to help and answer any question you might have. We look forward to hearing from you!
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-movie-secondary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-movie-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Our Address</h3>
                      <p className="text-muted-foreground">
                        1234 MovieLens<br />
                        Maharaja Road, Colombo 15293<br />
                        Sri Lanka
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-movie-secondary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-movie-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@movielens.com" className="hover:text-movie-secondary">
                          info@movielens.com
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        <a href="mailto:support@movielens.com" className="hover:text-movie-secondary">
                          support@movielens.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-movie-secondary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-movie-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+1234567890" className="hover:text-movie-secondary">
                          +94 77 123 4567
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        <a href="tel:+1987654321" className="hover:text-movie-secondary">
                          +94 72 972 3430
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-movie-secondary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-movie-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Working Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact form */}
              <div>
                <div className="bg-background shadow-lg rounded-xl p-6 border border-border">
                  <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                  {formStatus.submitted && !formStatus.error ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                      {formStatus.message}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Your Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-lg border ${
                            formErrors.name ? 'border-destructive' : 'border-border'
                          } bg-card focus:outline-none focus:border-movie-secondary`}
                          placeholder="Nimal Perera"
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-destructive">{formErrors.name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-lg border ${
                            formErrors.email ? 'border-destructive' : 'border-border'
                          } bg-card focus:outline-none focus:border-movie-secondary`}
                          placeholder="your@email.com"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-destructive">{formErrors.email}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-lg border ${
                            formErrors.subject ? 'border-destructive' : 'border-border'
                          } bg-card focus:outline-none focus:border-movie-secondary`}
                          placeholder="How can we help you?"
                        />
                        {formErrors.subject && (
                          <p className="mt-1 text-sm text-destructive">{formErrors.subject}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-lg border ${
                            formErrors.message ? 'border-destructive' : 'border-border'
                          } bg-card focus:outline-none focus:border-movie-secondary`}
                          placeholder="Your message here..."
                        ></textarea>
                        {formErrors.message && (
                          <p className="mt-1 text-sm text-destructive">{formErrors.message}</p>
                        )}
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="w-full py-3 bg-movie-secondary text-white font-medium rounded-lg hover:bg-movie-secondary/90 transition-colors"
                          disabled={formStatus.submitted && !formStatus.error}
                        >
                          {formStatus.submitted && !formStatus.error ? (
                            <div className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </div>
                          ) : (
                            'Send Message'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Find Us On The Map</h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-muted">
            {/* Placeholder for map */}
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                <p className="text-lg text-muted-foreground">Map integration would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">How do I create an account?</h3>
                <p className="text-muted-foreground">
                  Creating an account is easy! Click on the "Login" button in the top right corner, then select "Sign up" to register with your email or use one of our social login options.
                </p>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Is MovieLens free to use?</h3>
                <p className="text-muted-foreground">
                  Yes, MovieLens is completely free to use. We offer basic features to all users without any charge. We also have premium features available for subscribers.
                </p>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">How do I report an issue with the website?</h3>
                <p className="text-muted-foreground">
                  You can report any issues through our contact form above or by emailing support@movielens.com. Please provide as much detail as possible about the problem you're experiencing.
                </p>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Can I suggest movies or features to add?</h3>
                <p className="text-muted-foreground">
                  Absolutely! We love hearing from our users. Please use the contact form above to submit your suggestions. Our team reviews all feedback to improve MovieLens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
