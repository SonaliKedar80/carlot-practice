import { useState } from 'react';
import { sendEnquiry } from '../api.js';
import { validateEnquiry } from '../utils/validateEnquiry.js';

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' };

export default function ContactForm({ car, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateEnquiry(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');

    try {
      await sendEnquiry({ carId: car.id, ...form });
      setStatus('sent');
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
        setStatus('idle');
      } else {
        setStatus('failed');
      }
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-modal="true" aria-label="Contact seller">
        <h2>
          Contact seller: {car.year} {car.make} {car.model}
        </h2>

        {status === 'sent' ? (
          <>
            <p className="message message-success">
              Thanks! The seller will get back to you soon.
            </p>
            <button type="button" className="button" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <label className="field">
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={update}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span className="field-error" id="name-error">
                  {errors.name}
                </span>
              )}
            </label>

            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span className="field-error" id="email-error">
                  {errors.email}
                </span>
              )}
            </label>

            <label className="field">
              <span>Phone</span>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={update}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <span className="field-error" id="phone-error">
                  {errors.phone}
                </span>
              )}
            </label>

            <label className="field">
              <span>Message</span>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={update}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span className="field-error" id="message-error">
                  {errors.message}
                </span>
              )}
            </label>

            {status === 'failed' && (
              <p className="message message-error">
                Sorry, your message could not be sent. Please try again.
              </p>
            )}

            <div className="modal-actions">
              <button type="button" className="button button-light" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="button" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
