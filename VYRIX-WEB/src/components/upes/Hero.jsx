import { motion, useReducedMotion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[285px] md:max-w-[400px]"
    >
      <img
        src={`${import.meta.env.BASE_URL}Hero%20section%20studying%20boy.png`}
        alt="Student using Vyrix to organize design research"
        className="block h-auto w-full object-contain"
        loading="eager"
      />
    </motion.div>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="top" className="relative isolate overflow-hidden px-5 pb-20 pt-6 sm:px-8 sm:pb-24 sm:pt-10 lg:pb-[300px] lg:pt-[68px]">
      <motion.div
        aria-hidden="true"
        initial="rest"
        whileHover={prefersReducedMotion ? undefined : "wave"}
        className="absolute -right-52 -top-28 z-0 aspect-square w-[min(82vw,1110px)] cursor-pointer rounded-full"
        transition={{
          rest: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          wave: { duration: 0.35, ease: "easeOut" },
        }}
      >
        {[0, 9, 26].map((inset, ring) => (
          <motion.div
            key={ring}
            variants={{
              rest: {
                scale: 1,
                opacity: 0.7,
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              },
              wave: {
                scale: [1, 1.035, 1],
                opacity: [0.7, 1, 0.7],
                transition: {
                  duration: 2.4,
                  delay: ring * 0.24,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
              },
            }}
            className="absolute rounded-full border border-[#d8d4c8] shadow-[0_1px_4px_rgba(75,70,55,0.08)]"
            style={{ inset: `${inset}%` }}
          />
        ))}
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid min-h-[300px] max-w-[1320px] grid-cols-1 items-center gap-3 rounded-[2rem] border border-[#ededed] bg-white/70 px-7 py-4 sm:px-10 md:grid-cols-[1.1fr_0.9fr] md:px-14 md:py-[64px] lg:px-24"
      >
        <div className="relative z-10">
          <motion.h1
            variants={item}
            className="max-w-[660px] text-balance font-display text-[1.85rem] font-bold leading-[1.04] tracking-tight sm:text-[2.65rem] lg:text-[2.95rem]"
          >
            Vyrix Beta 2 just<br className="hidden sm:block" /> landed{" "}
            <span className="text-accent">on campus.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 max-w-[500px] text-[13px] leading-relaxed text-ink/65 sm:text-[14px]">
            Vyrix structures your project, checks your validation, and shows you what to do next, built for design students stuck between the brief and the breakthrough.
          </motion.p>

          <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="#download"
              className="group inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-[11px] font-medium text-accent transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Download size={14} />
              Download Vyrix Beta 2
            </a>
            <a
              href="#what-s-new"
              className="group inline-flex items-center gap-1.5 rounded-full border border-black/50 px-5 py-2 text-[11px] font-medium text-black transition-colors duration-200 hover:bg-black hover:text-white"
            >
              See what's new
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-4 text-[11px] text-ink/60">
            250+ design students are already using it
          </motion.p>
        </div>
        <HeroIllustration />
      </motion.div>
    </section>
  );
}
