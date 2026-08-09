"use client";

import { useRef, useState } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";
import DecorArcs from "./DecorArcs";
import HeroIllustration from "./HeroIllustration";

interface HeroProps {
  onSubmit: (email: string) => Promise<void> | void;
  error?: string | null;
}

export default function Hero({ onSubmit, error }: HeroProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(FULL_MOTION, () => {
        gsap.from(Array.from(copy.current!.children), {
          opacity: 0,
          y: 22,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        });
      });
    },
    { scope: copy },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await onSubmit(email);
    setIsLoading(false);
  };

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-[120px]">
      <DecorArcs variant="top" />

      <div className="relative mx-auto max-w-[1166px]">
        <div className="rounded-[26px] border border-[#DFE6EA] bg-[#FAFBFB] px-8 py-12 md:px-[84px] md:py-[52px]">
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-8">
            <div ref={copy}>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#0A0A0A] py-2.5 pl-4 pr-5 text-white">
                <span className="h-2 w-2 rounded-full bg-[#4A9EFF]" />
                <span className="text-[15px] font-semibold tracking-[-0.01em]">Early Access</span>
              </div>

              <h1 className="mt-8 text-[34px] font-extrabold leading-[1.18] tracking-[-0.035em] text-[#0A0A0A] lg:text-[38px]">
                Your project has a direction.
                <br />
                You just can&apos;t see it yet.
              </h1>

              <p className="mt-6 max-w-[430px] text-[16px] leading-[1.55] text-[#4B5563]">
                Vyrix structures your project, checks your validation, and shows you what to do
                next built for design students stuck between the brief and the breakthrough.
              </p>

              <form onSubmit={handleSubmit} className="mt-10">
                <label
                  htmlFor="hero-email"
                  className="block text-[13px] font-semibold text-[#0A0A0A]"
                >
                  Email
                </label>
                <div className="mt-2.5 flex items-stretch gap-3">
                  <input
                    id="hero-email"
                    type="email"
                    required
                    placeholder="Enter your email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-[52px] w-full max-w-[296px] rounded-[10px] border border-[#D6DDE2] bg-white px-4 text-[15px] text-[#0A0A0A] outline-none transition-colors placeholder:text-[#9AA5AC] focus:border-[#0A0A0A]"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="interactive-button h-[52px] shrink-0 rounded-[10px] bg-[#0A0A0A] px-6 text-[15px] font-bold text-white disabled:opacity-50"
                  >
                    <span className="relative z-10">{isLoading ? "Joining…" : "Join Waitlist"}</span>
                  </button>
                </div>
                {error && (
                  <p role="alert" className="mt-3 text-[13px] text-[#B42318]">
                    {error}
                  </p>
                )}
              </form>

              <p className="mt-8 text-[15px] text-[#4B5563]">
                <span className="font-bold text-[#0A0A0A]">250+</span> design students are already
                using it
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
