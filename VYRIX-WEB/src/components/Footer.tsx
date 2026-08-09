import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-12 text-white md:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-[15px] font-bold">Contact us at</p>
              <div className="mt-3 flex gap-8">
                <a
                  href="mailto:support@vyrix.in"
                  onClick={preventLink}
                  className="underline-slide text-[14px] text-[#C9C9C9] transition-colors hover:text-white"
                >
                  support@vyrix.in
                </a>
              </div>
            </div>

            <div>
              <p className="text-[15px] font-bold">Socials</p>
              <div className="mt-3 flex gap-3">
                <SocialLink label="Instagram" href="https://www.instagram.com/vyrixbyaispire?igsh=N3ViMjMxdnJnMWpo">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.3.07 1.69.07 4.9s0 3.6-.07 4.9c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.3.06-1.69.07-4.9.07s-3.6 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 3.13a6.67 6.67 0 1 0 0 13.34 6.67 6.67 0 0 0 0-13.34Zm0 11a4.33 4.33 0 1 1 0-8.66 4.33 4.33 0 0 1 0 8.66Zm8.49-11.27a1.56 1.56 0 1 1-3.12 0 1.56 1.56 0 0 1 3.12 0Z" />
                </SocialLink>
                <SocialLink label="LinkedIn" href="https://www.linkedin.com/company/vyrix/">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                </SocialLink>
              </div>
            </div>
          </div>

          <AspireMark />
        </div>

        <div className="mt-16 flex flex-col gap-4 text-[14px] text-[#C9C9C9] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Vyrix. All rights reserved.</p>

          <div className="flex gap-8">
            <a href="#" onClick={preventLink} className="underline-slide transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" onClick={preventLink} className="underline-slide transition-colors hover:text-white">
              Terms of use
            </a>
          </div>

          <p>
            A product from <span className="font-bold text-white">Aispire Private Limited</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#EDEDED] text-black transition-opacity hover:opacity-80"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        {children}
      </svg>
    </a>
  );
}

function preventLink(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}

function AspireMark() {
  return (
    <Image
      src="/aspire-logo.png"
      alt="Aspire"
      width={467}
      height={582}
      className="h-[112px] w-auto select-none"
    />
  );
}
