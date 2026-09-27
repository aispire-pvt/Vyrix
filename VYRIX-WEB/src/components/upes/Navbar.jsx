import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "What's new", href: "#what-s-new" },
  { label: "Reviews", href: "#reviews" },
  { label: "Download", href: "#download" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    let cancelAnimation = () => {};

    const onAnchorClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const anchor = event.target.closest("a[href^='#']");
      if (!anchor) return;

      const target = document.getElementById(decodeURIComponent(anchor.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      cancelAnimation();
      window.history.pushState(null, "", anchor.hash);

      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const startY = window.scrollY;
      const destinationY = Math.max(
        0,
        target.getBoundingClientRect().top + startY - headerHeight - 12
      );
      const distance = destinationY - startY;
      const duration = Math.min(1350, Math.max(700, Math.abs(distance) * 0.55));
      const startedAt = performance.now();

      const stopScroll = () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener("wheel", stopScroll);
        window.removeEventListener("touchstart", stopScroll);
        window.removeEventListener("keydown", stopScroll);
      };
      cancelAnimation = stopScroll;

      const animateScroll = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateScroll);
        } else {
          stopScroll();
        }
      };

      window.addEventListener("wheel", stopScroll, { passive: true });
      window.addEventListener("touchstart", stopScroll, { passive: true });
      window.addEventListener("keydown", stopScroll);
      animationFrame = requestAnimationFrame(animateScroll);
    };

    document.addEventListener("click", onAnchorClick);
    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimation();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 h-[48px] shadow-[0_2px_12px_rgba(17,17,16,0.06)] transition-[background-color,box-shadow] duration-300 md:h-[72px] ${
        scrolled ? "border-b border-line bg-cream/90 shadow-[0_4px_18px_rgba(17,17,16,0.09)] backdrop-blur-md" : "bg-cream"
      }`}
    >
      <nav className="mx-auto flex h-full max-w-[1760px] items-center justify-between px-6 sm:px-10 lg:pl-0 lg:pr-8">
        <a href="#top" aria-label="Vyrix home" className="flex items-center pl-2 sm:pl-3 lg:pl-4">
          <img src={`${import.meta.env.BASE_URL}Logo.png`} alt="Vyrix" className="h-3.5 w-auto md:h-5" />
        </a>

        <ul className="hidden items-center gap-10 text-[12px] text-ink md:flex">
          {LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="relative transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#download"
          className="hidden rounded-full bg-black py-2 pl-7 pr-10 text-xs font-medium text-accent transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg md:inline-block"
        >
          Contact Us
        </a>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-line bg-cream px-6 pb-6 md:hidden"
        >
          <ul className="flex flex-col gap-4 pt-4 text-base">
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block text-ink/80"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#download"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
