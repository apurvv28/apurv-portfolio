"use client";

import { type FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Rocket } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import FloatingInput from "@/components/ui/FloatingInput";
import Toast from "@/components/ui/Toast";

const CONTACT_EMAIL = "apurvsaktepar2806@gmail.com";

const channels = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail
  },
  {
    label: "GitHub",
    value: "@apurvv28",
    href: "https://github.com/apurvv28",
    icon: Github
  },
  {
    label: "LinkedIn",
    value: "Apurv Saktepar",
    href: "https://www.linkedin.com/in/apurv-saktepar-054a17281/",
    icon: Linkedin
  }
];

type FormFields = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const initialFields: FormFields = { name: "", email: "", message: "" };

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = "Name is required";
  if (!fields.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Enter a valid email address";
  if (!fields.message.trim()) errors.message = "Message is required";
  else if (fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
}

export default function ContactForm(): JSX.Element {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLaunching, setIsLaunching] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const reducedMotion = useReducedMotion();

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setToast({ message: "Check the highlighted fields before launch.", type: "error" });
      return;
    }

    setIsLaunching(true);
    const subject = `Portfolio inquiry from ${fields.name}`;
    const body = [`Name: ${fields.name}`, `Email: ${fields.email}`, "", fields.message].join("\n");
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    await new Promise((r) => setTimeout(r, reducedMotion ? 200 : 900));
    window.location.href = mailto;

    setIsLaunching(false);
    setFields(initialFields);
    setToast({ message: "Transmission sent — your email client should open shortly.", type: "success" });
  };

  return (
    <section id="contact" className="relative mx-auto mt-24 max-w-6xl px-6 pb-16 sm:mt-32 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
      >
        <SectionLabel index="08. CONTACT" title="Mission Control" kicker="COMMS CHANNEL" />

        <div className="glass-panel-strong glass-scrim grid gap-8 rounded-[2rem] p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
          {/* Left — contact channels */}
          <div className="space-y-6">
            <div>
              <p className="font-mono text-caption uppercase tracking-[0.22em] text-foreground-subtle">
                Open Channel
              </p>
              <p className="mt-3 text-body-sm leading-relaxed text-foreground-muted">
                Available for internships, freelance builds, and full-time opportunities. Response
                within 24 hours.
              </p>
            </div>

            <div className="flex items-center gap-3 neu-flat w-fit rounded-full px-4 py-2">
              <MapPin className="h-3.5 w-3.5 text-foreground-muted" strokeWidth={1.5} />
              <span className="font-mono text-caption text-foreground-muted">Pune, India · Remote</span>
            </div>

            <ul className="space-y-3">
              {channels.map((ch, i) => (
                <motion.li
                  key={ch.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <a
                    href={ch.href}
                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                    rel={ch.href.startsWith("http") ? "noreferrer" : undefined}
                    className="neu-raised group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-transform hover:-translate-y-0.5 active:neu-pressed"
                  >
                    <span className="neu-flat flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                      <ch.icon className="h-4 w-4 text-foreground-muted" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
                        {ch.label}
                      </span>
                      <span className="block truncate text-body-sm text-foreground">{ch.value}</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
            <FloatingInput
              label="Name"
              name="name"
              value={fields.name}
              onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
              error={errors.name}
              autoComplete="name"
            />
            <FloatingInput
              label="Email"
              name="email"
              type="email"
              value={fields.email}
              onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
              error={errors.email}
              autoComplete="email"
            />
            <FloatingInput
              label="Message"
              name="message"
              multiline
              rows={5}
              value={fields.message}
              onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
              error={errors.message}
            />

            <motion.button
              type="submit"
              disabled={isLaunching}
              whileTap={{ scale: 0.98 }}
              className="neu-raised group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-heading text-body-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 disabled:opacity-60 active:neu-pressed"
            >
              {isLaunching ? (
                <>
                  <motion.span
                    animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <Rocket className="h-4 w-4" strokeWidth={1.5} />
                  </motion.span>
                  <span>Launching…</span>
                  <motion.span
                    className="h-1 w-16 overflow-hidden rounded-full bg-surface-mid"
                    aria-hidden="true"
                  >
                    <motion.span
                      className="block h-full bg-foreground/30"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      style={{ width: "50%" }}
                    />
                  </motion.span>
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={1.5} />
                  Launch Transmission
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={Boolean(toast)}
          onDismiss={() => setToast(null)}
        />
      )}
    </section>
  );
}
