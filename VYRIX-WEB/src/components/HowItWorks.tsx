import DecorArcs from "./DecorArcs";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

const PHASES = [
  {
    title: "Research",
    body: "Capture interviews, observations, and context in one stream. Nothing gets lost.",
  },
  {
    title: "Organize",
    body: "Group findings by theme. Vyrix surfaces patterns you might have missed.",
  },
  {
    title: "Validate",
    body: "Test if your insights hold up. Spot gaps before they become problems.",
  },
  {
    title: "Move forward",
    body: "Turn insight into direction — know exactly what your next design decision should be.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <DecorArcs variant="top-right" />
      <DecorArcs variant="bottom-left" />

      <div className="relative mx-auto max-w-[1676px]">
        <div className="rounded-[26px] border border-[#DFE6EA] bg-[#FAFBFB] px-8 py-14 md:px-[68px] md:py-[68px]">
          <div className="mx-auto max-w-[1538px]">
            <Reveal>
              <SectionHeading
                eyebrow="How it works"
                title="Projects that move forward, not sideways"
                lead="Vyrix breaks your project into clear phases. Each one has a purpose, so you'll know what you're working on, why it matters, and when you're ready to move on."
              />
            </Reveal>

            <Reveal stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PHASES.map((phase) => (
                <TiltCard key={phase.title} className="h-full">
                  <article className="motion-card h-full rounded-[14px] bg-[#2E2E2E] px-7 py-8 text-white">
                    <h3 className="text-[16px] font-bold tracking-[-0.01em]">{phase.title}</h3>
                    <p className="mt-4 text-[14px] leading-[1.6] text-[#B8BCBE]">{phase.body}</p>
                  </article>
                </TiltCard>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
