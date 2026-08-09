import Image from "next/image";
import WaitlistPill from "./WaitlistPill";
import { getWaitlistCollection } from "@/lib/mongodb";

async function getWaitlistCount(): Promise<number> {
  try {
    const collection = await getWaitlistCollection();
    return await collection.countDocuments();
  } catch {
    return 0;
  }
}

export default async function Header() {
  const count = await getWaitlistCount();

  return (
    <header className="motion-header fixed inset-x-0 top-0 z-40 border-b border-black/5 bg-[#F7F8F8]">
      <div className="flex h-[74px] items-center justify-between px-6 md:px-16">
        <div className="flex items-center gap-2.5 text-[#0A0A0A]">
          <Image
            src="/vyrix-logo.png"
            alt="Vyrix"
            width={1455}
            height={248}
            className="h-auto w-[132px] select-none"
          />
        </div>

        <div className="motion-header__pill">
          <WaitlistPill count={count} />
        </div>
      </div>
    </header>
  );
}
