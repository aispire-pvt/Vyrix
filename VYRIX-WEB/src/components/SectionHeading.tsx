export default function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div>
      <p className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#6B7280]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[44px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0A0A0A]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 max-w-[820px] text-[16px] leading-[1.55] text-[#4B5563]">{lead}</p>
      )}
    </div>
  );
}
