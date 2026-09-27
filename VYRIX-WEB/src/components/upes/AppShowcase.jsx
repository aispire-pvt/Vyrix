import { motion } from "framer-motion";

export default function AppShowcase() {
  return (
    <section id="product" className="px-5 pb-20 sm:px-8 sm:pb-24 lg:pb-[110px]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1035px] overflow-hidden rounded-xl border border-[#e4e4e4] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.14)]"
      >
        <img
          src={`${import.meta.env.BASE_URL}homeDark.png`}
          alt="Vyrix application workspace with active missions and recent chats"
          className="block h-auto w-full"
          loading="lazy"
        />
      </motion.div>
    </section>
  );
}
