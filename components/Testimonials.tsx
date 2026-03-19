"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Pranjal Bannore",
    role: "Senior Cloud Architect, TCS Pune",
    quote:
      "Apurv brings rare depth in both AI systems and product execution. He shipped complex workflows that our team now depends on daily.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Apurv"
  },
  {
    name: "Pritam Chhanchure",
    role: "CEO, iBid Logistics Pvt. Ltd., Solapur",
    quote:
      "Strong architecture instincts, great communication, and a bias for shipping. Apurv consistently turns ideas into production-grade outcomes.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mentor"
  },
  {
    name: "Darshan Dodal",
    role: "CEO, Bits and Volts Pvt. Ltd., Pune",
    quote:
      "From feature strategy to implementation speed, working with Apurv felt seamless. The attention to performance and usability stood out.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design"
  }
];

export default function Testimonials(): JSX.Element {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[10px] font-semibold tracking-[0.3em] text-cyan-400 uppercase sm:text-xs">Testimonials</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Trusted by <span className="text-cyan-400">builders</span>.</h2>
      </motion.div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group glass-card rounded-3xl border border-white/5 bg-[#0a0f1a]/40 p-8 transition-colors hover:border-cyan-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-cyan-500/20">
                <img
                  src={item.avatar}
                  alt={`${item.name} avatar`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{item.name}</p>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.role}</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-gray-400 sm:text-base italic">
              &ldquo;{item.quote}&rdquo;
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
