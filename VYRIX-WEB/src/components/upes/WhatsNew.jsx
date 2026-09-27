import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Seamless AI across your workspace",
    lead:
      "AI is now integrated across all your projects, giving users an even better experience. With features such as,",
    points: [
      "No need to explain your projects again and again every time you start a new chat.",
      "AI will provide you with a roadmap based on your goals & needs.",
      "Quickly know what to do next in your projects with real-time suggestions, and validate your progress.",
    ],
  },
  {
    title: "Other new features",
    points: [
      "Added whiteboards.",
      "Create notes directly in Flow.",
      "You can now rename folders, files, and links.",
      "Notes can be exported as doc files & PDFs, and whiteboards can be exported as PDFs.",
      "Chat history with AI will now be stored.",
      "Overall user flow is improved significantly.",
    ],
  },
  {
    title: "Reworked Repository — a dynamic, living space",
    points: [
      "The Repository is now Flow, which implies what it means: your research roadmap where you can store all your resources.",
      "Now you can import all your files from Flow directly into your notes and even into AI chats.",
      "Coming shipped with more personalization options to provide you flexibility with your projects.",
    ],
  },
  {
    title: "A fresh new look",
    points: [
      "Light theme is now available, giving users an option to switch between dark and light theme as they prefer.",
      "UI hierarchy is improved and navigation is much simpler.",
      "A carefully calibrated palette that lets you work longer without visual fatigue.",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function WhatsNew() {
  return (
    <section id="what-s-new" className="mx-auto max-w-[1360px] px-5 py-6 sm:px-8 sm:py-10">
      <div className="rounded-[1.75rem] border border-[#dce5e9] px-5 py-6 sm:px-9 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="mb-3 text-sm text-ink/45">Exclusive Updates</p>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          What's new in Beta 2
        </h2>
        <p className="mt-3 max-w-2xl text-[14px] text-ink/65">
          Every item below came out of Beta 1 feedback threads. If you asked for it,
          it's probably here.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-xl2 bg-[#2d2d2d] p-6 text-white transition-transform duration-300 hover:-translate-y-1 sm:p-7"
          >
            <h3 className="mb-3 font-display text-lg font-semibold">{f.title}</h3>
            {f.lead && <p className="mb-3 text-[14px] leading-relaxed text-white/75">{f.lead}</p>}
            <ol className="list-decimal space-y-1 pl-5 text-[14px] leading-relaxed text-white/90 marker:text-white/90">
              {f.points.map((p, idx) => (
                <li key={idx} className="pl-1">{p}</li>
              ))}
            </ol>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
