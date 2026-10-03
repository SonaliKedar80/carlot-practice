import { useState } from 'react';
import { sendEnquiry } from '../api.js';

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' };

export default function ContactForm({ car, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('sending');

    try {
      await sendEnquiry({ carId: car.id, ...form });
      setStatus('sent');
    } catch {
      setStatus('failed');
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
          <form onSubmit={handleSubmit}>
            <label className="field">
              <span>Name</span>
              <input name="name" value={form.name} onChange={update} />
            </label>

            <label className="field">
              <span>Email</span>
              <input name="email" value={form.email} onChange={update} />
            </label>

            <label className="field">
              <span>Phone</span>
              <input name="phone" value={form.phone} onChange={update} />
            </label>

            <label className="field">
              <span>Message</span>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={update}
              />
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
