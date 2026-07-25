"use client";
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput
      );

      if (res.data.whatsappUrl) {
        setWhatsappUrl(res.data.whatsappUrl);
      }
      setIsSuccess(true);
      setUserInput({ name: "", email: "", message: "" });
    } catch {
      // silent
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank");
    }
  };

  if (isSuccess) {
    return (
      <div className="p-6 lg:p-8 rounded-2xl bg-[var(--card)] border border-white/5 text-center">
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="w-16 h-16 rounded-full bg-[var(--neon)]/10 flex items-center justify-center">
            <FaCheckCircle size={32} className="text-[var(--neon)]" />
          </div>
          <h3 className="text-xl font-bold text-white">Message Sent!</h3>
          <p className="text-gray-400 text-sm">Email has been sent to Ajit. You can also reach directly via WhatsApp.</p>

          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[#20bd5a] hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] mt-4"
          >
            <FaWhatsapp size={18} />
            Open WhatsApp
          </button>

          <button
            onClick={() => { setIsSuccess(false); setWhatsappUrl(""); }}
            className="text-gray-500 text-xs hover:text-gray-300 transition-colors mt-2"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-6 lg:p-8 rounded-2xl bg-[var(--card)] border border-white/5">
        <p className="text-sm text-gray-400 mb-6">
          Have a project in mind? Fill out the form below and I&apos;ll get back to you within 24 hours.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Your Name</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-[var(--dark)] border border-white/10 text-white text-sm focus:border-[var(--cyan)] focus:ring-1 focus:ring-[var(--cyan)]/20 outline-none transition-all duration-300 placeholder:text-gray-600"
              type="text"
              maxLength="100"
              placeholder="John Doe"
              required
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Your Email</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-[var(--dark)] border border-white/10 text-white text-sm focus:border-[var(--cyan)] focus:ring-1 focus:ring-[var(--cyan)]/20 outline-none transition-all duration-300 placeholder:text-gray-600"
              type="email"
              maxLength="100"
              placeholder="john@example.com"
              required
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email && <p className="text-xs text-red-400">Please provide a valid email!</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Your Message</label>
            <textarea
              className="w-full px-4 py-3 rounded-xl bg-[var(--dark)] border border-white/10 text-white text-sm focus:border-[var(--cyan)] focus:ring-1 focus:ring-[var(--cyan)]/20 outline-none transition-all duration-300 placeholder:text-gray-600 resize-none"
              maxLength="500"
              placeholder="Tell me about your project..."
              required
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>

          {error.required && (
            <p className="text-xs text-red-400">All fields are required!</p>
          )}

          <button
            className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[var(--electric)] to-[var(--hot)] text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,47,247,0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSendMail}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Send Message
                <TbMailForward size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
