"use client";
import { motion } from "framer-motion";

function PlatformIcon({ src, alt, className = "h-7 w-7" }) {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

const PLATFORMS = [
  {
    name: "Windows",
    src: `/WindowsLogo.png`,
    alt: "Windows logo",
    href: process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL || process.env.NEXT_PUBLIC_DOWNLOAD_URL_WINDOWS || "#",
    installGuideUrl: process.env.NEXT_PUBLIC_WINDOWS_INSTALL_GUIDE_URL || process.env.NEXT_PUBLIC_INSTALL_GUIDE_WINDOWS || "#",
  },
  {
    name: "Mac",
    src: `/AppleLogo.png`,
    alt: "Apple logo",
    href: process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL || process.env.NEXT_PUBLIC_DOWNLOAD_URL_MAC || "#",
    installGuideUrl: process.env.NEXT_PUBLIC_MAC_INSTALL_GUIDE_URL || process.env.NEXT_PUBLIC_INSTALL_GUIDE_MAC || "#",
  },
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
        {PLATFORMS.map(({ name, src, alt, href, installGuideUrl }, i) => (
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
              <a
                href={installGuideUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!installGuideUrl || installGuideUrl === "#") {
                    e.preventDefault();
                    console.warn(`Install guide link for ${name} is not set in environment variables.`);
                  }
                }}
                className="inline-flex items-center justify-center rounded-full border border-black/40 px-7 py-2 text-[11px] font-medium transition-colors hover:bg-black hover:text-white"
              >
                How to install
              </a>
              <a
                href={href}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!href || href === "#") {
                    e.preventDefault();
                    console.warn(`Download link for ${name} is not set in environment variables.`);
                  }
                }}
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-2 text-[11px] font-medium text-accent transition-transform hover:-translate-y-0.5"
              >
                Download
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
