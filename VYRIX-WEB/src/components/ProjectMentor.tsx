import DecorArcs from "./DecorArcs";
import Reveal from "./Reveal";

const POINTS = [
  {
    lead: "Validation loops.",
    body: " Feed it your assumptions — it tells you if your project actually supports them.",
  },
  {
    lead: "Gap spotting.",
    body: " It flags blind spots in your project before you present.",
  },
  {
    lead: "Reasoning transparency.",
    body: " You see why it suggests something, so you can disagree if needed.",
  },
];

export default function ProjectMentor() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <DecorArcs variant="left" />

      <div className="relative mx-auto max-w-[1166px]">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#6B7280]">
            Your project mentor
          </p>
          <h2 className="mt-3 text-[44px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0A0A0A]">
            An AI that guides, not just generates
          </h2>
        </Reveal>

        <div className="mt-5 grid gap-10 md:grid-cols-[minmax(0,1.47fr)_minmax(0,1fr)] md:gap-16">
          <div>
            <p className="max-w-[820px] text-[16px] leading-[1.55] text-[#4B5563]">
              Your project deserves a second mind. Our integrated AI doesn&apos;t do all the work
              for you but, It validates your thinking, spots contradictions, and asks the
              questions you should be asking.
            </p>

            <Reveal stagger direction="left" className="mt-10 space-y-6">
              {POINTS.map((point) => (
                <div key={point.lead} className="motion-feature flex gap-4">
                  <CheckBadge />
                  <p className="max-w-[500px] text-[15px] leading-[1.55] text-[#374151]">
                    <span className="font-medium text-[#0A0A0A]">{point.lead}</span>
                    {point.body}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal
            delay={0.1}
            direction="right"
            className="motion-card self-start rounded-[16px] border border-[#DFE6EA] px-8 py-8"
          >
            <p className="text-[15px] leading-[1.6] text-[#4B5563]">
              &quot;Your concept shows strong Desire and Viability, but you&apos;ll need to address
              feasibility challenges before advancing further.&quot;
            </p>
            <p className="mt-6 text-[15px] leading-[1.6] text-[#4B5563]">
              Suggested next step: interview 2–3 non-student users before finalizing this persona.
            </p>
            <p className="mt-6 text-[15px] leading-[1.6] text-[#4B5563]">
              Your synthesis in Phase 2 is solid. Ready to move into validation.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CheckBadge() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="motion-feature__badge mt-0.5 h-5 w-5 shrink-0 text-[#0A0A0A]"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="M5.8 10.3 L8.6 13 L14.2 7.2"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
