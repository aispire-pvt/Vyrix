import CountUp from "./CountUp";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const STATS = [
  { value: 250, suffix: "+", label: "Students from UPES, NID, & NIFT in Beta 1 & 2" },
  { value: 420, suffix: "+", label: "Projects already organized" },
  { value: 94, suffix: "%", label: "Would recommend to classmates" },
];

const TESTIMONIALS = [
  {
    quote:
      "The Roadmap, Flow repository and Workspace. Loved the range of customization in the native Vyrix document. Being able to add Canva/Figma file directly is such a cool feature. Being able to mark projects complete or Incomplete. And being able to sort the projects in the folders in order of priority.",
    name: "Raunak Arora",
    detail: "B.Des, UPES · Sem 7",
  },
  {
    quote:
      "Well, to look back I had AI that I could use at an instant to find research papers related to the subject and the fact that i could upload a lot of different types of files into one place. Also the To do list being In the front space of the app really helped me (I normally don't use to-dos - hence getting distracted) stay focused as I was eager to check something off the list.",
    name: "Shivika Dubey",
    detail: "B.Des, NID · Sem 7",
  },
];

export default function TrustedByStudents() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-[1166px]">
        <Reveal>
          <SectionHeading eyebrow="Trusted by students" title="Already shaping stronger projects" />
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="motion-card rounded-[14px] border border-[#DFE6EA] px-7 py-8">
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                className="text-[38px] font-extrabold leading-none tracking-[-0.03em] text-[#0A0A0A]"
              />
              <p className="mt-4 text-[14px] leading-[1.5] text-[#4B5563]">{stat.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal stagger className="mt-4 grid gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="motion-card rounded-[14px] border border-[#DFE6EA] px-7 py-8">
              <blockquote className="text-[14px] leading-[1.65] text-[#4B5563]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-7">
                <p className="text-[14px] font-bold text-[#0A0A0A]">{t.name}</p>
                <p className="mt-1 text-[12px] text-[#6B7280]">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
