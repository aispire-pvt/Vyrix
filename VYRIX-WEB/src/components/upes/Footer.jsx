import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mt-10 bg-black text-white"
    >
      <div className="container-px mx-auto flex max-w-[1760px] flex-col gap-10 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-white/70">Contact us at</p>
          <a href="mailto:support@vyrix.in" className="text-xs font-medium">
            support@vyrix.in
          </a>

          <p className="mt-5 text-xs text-white/70">Socials</p>
          <div className="mt-2 flex gap-3">
            <a
              href="https://www.instagram.com/vyrixbyaispire"
              aria-label="Instagram"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-accent"
            >
              <Instagram size={14} />
            </a>
            <a
              href="https://www.linkedin.com/company/vyrix/"
              aria-label="LinkedIn"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-accent"
            >
              <Linkedin size={14} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-center">
          <img src={`${import.meta.env.BASE_URL}footerLogo.png`} alt="Aispire logo" className="h-44 w-auto object-contain" loading="lazy" />
          <p className="text-[10px] text-white/75">A product from Aispire Private Limited</p>
        </div>
      </div>

      <div className="container-px mx-auto flex max-w-[1760px] flex-col-reverse items-center justify-between gap-4 border-t border-white/25 py-5 text-[10px] text-white/65 sm:flex-row">
        <p>© 2026 Vyrix. All rights reserved.</p>
        <div className="flex gap-6 sm:ml-auto sm:mr-[34%]">
          <a href="#" className="transition-colors hover:text-cream">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-cream">
            Terms of use
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
