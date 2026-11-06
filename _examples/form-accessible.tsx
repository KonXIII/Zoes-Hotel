// Reference only — accessible form with react-hook-form + zod.
// Real error states, aria-describedby, disabled/loading states, no shake on error
// (shake only if user has triggered submit twice — avoid motion tax).
// Success is shown only after the server confirms (res.ok), and the conversion
// event fires there, never on the button click (measurement-plan.md).
"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("That doesn't look like an email"),
  budget: z.enum(["<10k", "10–30k", "30k+"]),
  message: z.string().min(20, "A sentence or two about the project helps"),
});
type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [sent, setSent] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Confirmed lead: the event name comes from measurement-plan.md. No PII in properties.
      track("lead_submitted", { form: "contact" });
      setSent(true);
    } catch {
      setError("root", {
        message: "Your message didn't send. Please try again, or email us at hello@example.com.",
      });
    }
  };

  if (sent) {
    return (
      <p role="status" className="text-[color:var(--color-success)]">
        Thanks — we&rsquo;ll reply within one working day.
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-[var(--space-6)] max-w-[52ch]"
    >
      <Field label="Name" error={errors.name?.message} htmlFor="name">
        <input
          id="name"
          autoComplete="name"
          className="input"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
      </Field>

      <Field label="Email" error={errors.email?.message} htmlFor="email">
        <input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          className="input"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </Field>

      <Field label="Budget" error={errors.budget?.message} htmlFor="budget">
        <select id="budget" className="input" {...register("budget")}>
          <option value="">Select a range</option>
          <option value="<10k">Under 10k</option>
          <option value="10–30k">10–30k</option>
          <option value="30k+">30k+</option>
        </select>
      </Field>

      <Field label="Project" error={errors.message?.message} htmlFor="message">
        <textarea
          id="message"
          rows={5}
          className="input resize-y"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
      </Field>

      {errors.root && (
        <p role="alert" className="text-sm text-[color:var(--color-danger)]">
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[color:var(--color-fg)] text-[color:var(--color-bg)] px-6 text-sm font-medium transition-transform duration-[var(--duration-micro)] ease-[var(--ease-out-quart)] hover:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Send"}
      </button>

      <style>{`
        .input {
          width: 100%;
          min-height: 44px;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 0.625rem 0.875rem;
          font: inherit;
          color: inherit;
          transition: border-color var(--duration-micro) var(--ease-out-quart);
        }
        .input:focus-visible {
          border-color: var(--color-brand);
          outline: 2px solid color-mix(in oklch, var(--color-brand) 40%, transparent);
          outline-offset: 1px;
        }
        .input[aria-invalid="true"] {
          border-color: var(--color-danger);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium mb-[var(--space-2)]">
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-[var(--space-2)] text-sm text-[color:var(--color-danger)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
