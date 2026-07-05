import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  FileText, Github, Linkedin, Mail, MapPin, Phone,
  Send, Loader2, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ─────────────────────────────────────────────────────────────
// EmailJS credentials — stored in .env at the project root.
//
// Open  Portfolio/.env  and replace the placeholder values:
//
//   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
//   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//   VITE_EMAILJS_PUBLIC_KEY=aBcDeFgHiJkLmNoPq
//
// Restart the dev server after editing .env.
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

const GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=rohitkumar75997@gmail.com';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'rohitkumar75997@gmail.com',
    href: GMAIL,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 6299394952',
    href: 'tel:+916299394952',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Siwan, Bihar, India',
    href: null,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Rohitkumar968',
    href: 'https://github.com/Rohitkumar968',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/rohitkumar58',
    href: 'https://www.linkedin.com/in/rohitkumar58',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 hero-bg opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-subtitle"
          >
            Open to Full Stack Developer, Frontend Developer, and Software Engineer roles
          </motion.p>
        </div>

        <div className={`max-w-6xl mx-auto ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mb-8 p-5 rounded-lg bg-primary/5 border border-primary/20"
          >
            <p className="text-muted-foreground leading-relaxed text-center">
              Thank you for visiting my portfolio. If you have a full-time opportunity, freelance
              project, or just want to connect, feel free to reach out. I would love to collaborate
              and build something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* ── Left — Contact Info ── */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                <div className="grid gap-3">
                  {contactInfo.map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="flex items-center gap-4 rounded-lg border border-border bg-secondary/40 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${item.label}: ${item.value}`}
                            className="font-medium text-sm hover:text-primary transition-colors break-all"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-sm">{item.value}</p>
                        )}
                        {item.label === 'Email' && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Click the email address or Email Me button to send me an email.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={GMAIL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send email to Rohit Kumar"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg px-8 text-base font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Email Me
                </a>

                <Button variant="heroOutline" size="lg" className="flex-1" asChild>
                  <a
                    href="/rohit%20resume.pdf"
                    download="Rohit_Kumar_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Rohit Kumar's resume"
                  >
                    <FileText className="w-5 h-5" />
                    View Resume
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* ── Right — Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormFields {
  name: string;
  email: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

// ─────────────────────────────────────────────
// Client-side validation
// ─────────────────────────────────────────────
function validate(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.name.trim()) {
    errors.name = 'Full name is required.';
  }
  if (!fields.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.message.trim()) {
    errors.message = 'Message is required.';
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

// ─────────────────────────────────────────────
// ContactForm
// ─────────────────────────────────────────────
function ContactForm() {
  // formRef is kept for potential future sendForm() use but we use send() below
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-side validation
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 2. Guard: warn loudly in dev if credentials are still placeholders
    if (
      !EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      !EMAILJS_TEMPLATE_ID || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      !EMAILJS_PUBLIC_KEY  || EMAILJS_PUBLIC_KEY  === 'YOUR_PUBLIC_KEY'
    ) {
      console.error(
        '[EmailJS] Credentials not configured.\n' +
        'Open Portfolio/.env and set:\n' +
        '  VITE_EMAILJS_SERVICE_ID\n' +
        '  VITE_EMAILJS_TEMPLATE_ID\n' +
        '  VITE_EMAILJS_PUBLIC_KEY\n' +
        'Then restart the dev server.'
      );
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    setStatus('loading');

    try {
      // ── EmailJS template variable reference ──────────────────────────────
      // These keys MUST match your EmailJS template variables exactly.
      //
      // In the EmailJS dashboard (emailjs.com → Email Templates → your template):
      //
      //   Content tab — set the body to:
      //     Name:    {{name}}
      //     Email:   {{email}}
      //     Message: {{message}}
      //
      //   Settings tab — set these fields:
      //     To Email  : rohitkumar75997@gmail.com
      //     From Name : {{name}}
      //     Reply To  : {{email}}   ← THIS is what fixes Gmail Reply
      //
      // Save the template after every change.
      // ────────────────────────────────────────────────────────────────────
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:    fields.name.trim(),    // {{name}}    in template
          email:   fields.email.trim(),   // {{email}}   in template → Reply-To
          message: fields.message.trim(), // {{message}} in template
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      console.log('[EmailJS] Email sent successfully:', result.status, result.text);
      setStatus('success');
      setFields({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 5000);

    } catch (err: unknown) {
      // Log the real error so you can debug it in the browser console
      console.error('[EmailJS] Failed to send email:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClass = (field: keyof FieldErrors) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm placeholder:text-muted-foreground bg-secondary/40 focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? 'border-destructive focus:ring-destructive/40'
        : 'border-border focus:ring-primary/50'
    }`;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4 flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-2">Send Me a Message</h3>

      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-sm text-muted-foreground">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={fields.name}
            onChange={handleChange}
            disabled={status === 'loading'}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClass('name')}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                id="name-error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-destructive flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-sm text-muted-foreground">
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={fields.email}
            onChange={handleChange}
            disabled={status === 'loading'}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass('email')}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                id="email-error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-destructive flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5 flex-1">
        <label htmlFor="contact-message" className="text-sm text-muted-foreground">
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about your project, opportunity, or just say hello..."
          value={fields.message}
          onChange={handleChange}
          disabled={status === 'loading'}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputClass('message')} resize-none`}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              id="message-error"
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Status banners */}
      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 text-sm text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3"
          >
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            Message sent successfully! I'll get back to you soon.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            role="alert"
            aria-live="assertive"
            className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Failed to send. Check the browser console for details, or email me directly.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="flex justify-end pt-1">
        <Button
          type="submit"
          variant="hero"
          size="lg"
          disabled={status === 'loading' || status === 'success'}
          aria-label="Send message"
          className="min-w-[160px]"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Sent!
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
