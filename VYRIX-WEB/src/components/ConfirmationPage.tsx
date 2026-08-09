import DecorArcs from "./DecorArcs";
import HeroIllustration from "./HeroIllustration";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

export default function ConfirmationPage({ position }: { position: number }) {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-[120px]">
      <DecorArcs variant="top" />

      <div className="relative mx-auto max-w-[1166px]">
        <div className="rounded-[26px] border border-[#DFE6EA] bg-[#FAFBFB] px-8 py-12 md:px-[84px] md:py-[52px]">
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] md:gap-8">
            <Reveal>
              <p className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#6B7280]">
                You&apos;re on the list
              </p>

              <CountUp
                value={position}
                prefix="#"
                className="mt-4 text-[52px] font-extrabold leading-none tracking-[-0.03em] text-[#0A0A0A]"
              />

              <p className="mt-7 text-[16px] font-bold text-[#0A0A0A]">
                Early access opens in 8 – 10 weeks.
              </p>
              <p className="mt-1.5 text-[16px] text-[#4B5563]">
                We&apos;ll email you first — no need to check back.
              </p>
            </Reveal>

            <div className="flex justify-center md:justify-end">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
