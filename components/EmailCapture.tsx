"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submitEmail() {
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setEmail("");
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="my-16 rounded-3xl border border-teal-300/20 bg-teal-400/10 p-8 text-center shadow-[0_0_50px_rgba(45,212,191,0.12)]">
      <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
        Stay Connected
      </p>

      <h2 className="mt-3 text-3xl font-bold">Updates from Arkhe</h2>

      <p className="mx-auto mt-4 max-w-2xl text-white/65">
        Follow future updates on ventures, insights, systems, and launches.
      </p>

      <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-12 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none placeholder:text-white/35 focus:border-teal-300/50"
        />

        <button
          type="button"
          onClick={submitEmail}
          disabled={status === "loading"}
          className="min-h-12 rounded-xl bg-teal-300 px-6 font-semibold text-black hover:bg-teal-200 disabled:opacity-60"
        >
          {status === "loading" ? "Joining..." : "Join"}
        </button>
      </div>

      {status === "success" && (
        <p className="mt-3 text-sm text-teal-300">
          You are on the list.
        </p>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm text-red-300">
          Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}
