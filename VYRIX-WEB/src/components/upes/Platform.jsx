import { motion } from "framer-motion";

function PlatformIcon({ src, alt, className = "h-7 w-7" }) {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

const PLATFORMS = [
  { name: "Windows", src: `${import.meta.env.BASE_URL}WindowsLogo.png`, alt: "Windows logo" },
  { name: "Mac", src: `${import.meta.env.BASE_URL}AppleLogo.png`, alt: "Apple logo" },
];

export default function Platform() {
  return (
    <section id="download" className="container-px mx-auto mt-12 max-w-[1040px] py-14 text-center sm:py-20 lg:mt-[85px] lg:pb-[220px]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="mb-9 font-display text-2xl font-bold tracking-tight sm:text-3xl"
      >
        Choose your platform
      </motion.h2>

      <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
        {PLATFORMS.map(({ name, src, alt }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="flex flex-col items-center gap-4 px-2 py-2"
          >
            <div className="flex items-center gap-3 text-lg font-medium">
              <PlatformIcon src={src} alt={alt} className="h-7 w-7 object-contain" />
              {name}
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full border border-black/40 px-7 py-2 text-[11px] font-medium transition-colors hover:bg-black hover:text-white">
                How to install
              </button>
              <button className="rounded-full bg-black px-8 py-2 text-[11px] font-medium text-accent transition-transform hover:-translate-y-0.5">
                Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
