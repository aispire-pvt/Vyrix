"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import WhoItsFor from "@/components/WhoItsFor";
import HowItWorks from "@/components/HowItWorks";
import ProjectMentor from "@/components/ProjectMentor";
import TrustedByStudents from "@/components/TrustedByStudents";
import Footer from "@/components/Footer";
import ConfirmationPage from "@/components/ConfirmationPage";
import ScrollProgress from "@/components/ScrollProgress";
import { joinWaitlist } from "@/lib/waitlist";

export default function Home() {
  const [position, setPosition] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (email: string) => {
    setSubmitError(null);

    try {
      const nextPosition = await joinWaitlist(email);
      setPosition(nextPosition);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Please try again in a moment.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />

      <main className="pt-[74px]">
        {position !== null ? (
          <ConfirmationPage position={position} />
        ) : (
          <>
            <Hero onSubmit={handleSubmit} error={submitError} />
            <WhoItsFor />
            <HowItWorks />
            <ProjectMentor />
            <TrustedByStudents />
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}
