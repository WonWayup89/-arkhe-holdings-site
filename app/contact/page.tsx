"use client";

import { useState, useRef } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      subject: String(data.get("subject") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-teal-300/50";
  const labelClass = "block text-sm text-white/60 mb-1";

  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <SiteNav />

        <h1 className="mt-6 text-5xl font-bold">Contact</h1>
        <p className="mt-4 text-lg text-white/70">
          Send us a message and we&apos;ll get back to you as soon as possible.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          {status === "success" ? (
            <p className="text-center text-teal-300 text-lg font-medium">
              Your message has been received. We will respond shortly.
            </p>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="subject" className={labelClass}>
                  Subject{" "}
                  <span className="text-white/30">(optional)</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is this regarding?"
                  className={inputClass}
                />
              </div>

              <div className="mt-6">
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="mt-4 text-sm text-red-400">
                  Something went wrong. Please email{" "}
                  <a
                    href="mailto:brian.salsbury@arkheholdings.net"
                    className="underline hover:text-red-300"
                  >
                    brian.salsbury@arkheholdings.net
                  </a>{" "}
                  directly.
                </p>
              )}

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-xl bg-teal-300 px-6 py-3 font-semibold text-black hover:bg-teal-200 disabled:opacity-60 transition-colors"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 text-center text-white/40 text-sm">
          Prefer email?{" "}
          <a
            href="mailto:brian.salsbury@arkheholdings.net"
            className="text-teal-300 hover:text-teal-200 transition-colors"
          >
            brian.salsbury@arkheholdings.net
          </a>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6">
        <SiteFooter />
      </div>
    </main>
  );
}
