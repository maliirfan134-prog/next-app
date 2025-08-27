"use client";

import { useState } from "react";

export default function ContactPage() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Success message dikhana
    setSuccess(true);

    // Form ko clear karna
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white shadow p-6 rounded-xl"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 rounded-md"
          required
        />
        <textarea
          placeholder="Your Message"
          rows={4}
          className="border p-2 rounded-md"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Send Message
        </button>
      </form>

      {success && (
        <p className="mt-4 text-green-600 font-medium">
          ✅ Message sent successfully!
        </p>
      )}
    </div>
  );
}
