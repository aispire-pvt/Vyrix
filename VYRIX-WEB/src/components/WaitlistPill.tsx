export default function WaitlistPill({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full bg-[#0A0A0A] py-2.5 pl-4 pr-5 text-white">
      <span className="status-dot h-2 w-2 rounded-full bg-[#4A9EFF]" />
      <span className="text-[15px] font-semibold tracking-[-0.01em]">
        {count.toLocaleString()} students waiting
      </span>
    </div>
  );
}
