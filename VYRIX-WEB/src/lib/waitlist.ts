type WaitlistResponse = {
  position: number;
};

const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_API_URL || "/api/waitlist";

export async function joinWaitlist(email: string): Promise<number> {
  const response = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = isRecord(payload) && typeof payload.error === "string" ? payload.error : null;
    throw new Error(message ?? "We couldn’t join the waitlist. Please try again.");
  }

  if (!isWaitlistResponse(payload)) {
    throw new Error("The waitlist service returned an invalid position.");
  }

  return payload.position;
}

function isWaitlistResponse(value: unknown): value is WaitlistResponse {
  return isRecord(value) && typeof value.position === "number" && Number.isFinite(value.position);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
