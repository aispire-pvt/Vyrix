import DecorArcs from "./DecorArcs";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const CARDS = [
  {
    title: "Struggling with structure",
    body: "Your project lives across notes, screenshots, and browser tabs. You can't find what you need when you need it, or don't know what maps to what.",
  },
  {
    title: "Lost in organization",
    body: "Hours go into sorting findings into frameworks that might not even matter. You're not sure there's a better way to structure it.",
  },
  {
    title: "Struggling with structure",
    body: "You've gathered insights, but you're not confident they're real or complete. Have you talked to enough users? Is your data telling you anything?",
  },
  {
    title: "Struggling with structure",
    body: 'You have the findings and the insights, but turning "I learned this" into "therefore we should do that" still feels vague.',
  },
];

export default function WhoItsFor() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <DecorArcs variant="bottom-right" />

      <div className="relative mx-auto max-w-[1538px]">
        <Reveal>
          <SectionHeading
            eyebrow="Who it's for"
            title="Design students caught in the middle"
            lead="You're not struggling with design thinking, You're struggling with doing it at scale. Vyrix is built for the moment after you've understood the problem, and before you ship the solution."
          />
        </Reveal>

        <Reveal stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <article
              key={i}
              className="motion-card rounded-[14px] border border-[#DFE6EA] bg-white/60 px-7 py-8"
            >
              <h3 className="text-[16px] font-bold tracking-[-0.01em] text-[#0A0A0A]">
                {card.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.6] text-[#4B5563]">{card.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
