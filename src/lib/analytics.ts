const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type TrackPayload = {
  path: string;
  referrer?: string;
  userAgent?: string;
  eventType?: string;
  section?: string;
};

function buildPayload(overrides?: Partial<TrackPayload>): TrackPayload {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const referrer = typeof document !== "undefined" ? document.referrer : "";
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";

  return {
    path: pathname,
    referrer,
    userAgent,
    ...overrides,
  };
}

async function postPageView(payload: TrackPayload): Promise<void> {
  if (!API_BASE_URL) return;

  try {
    await fetch(`${API_BASE_URL}/page-views`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Analytics should never block UX.
  }
}

export async function trackPageView(section?: string): Promise<void> {
  await postPageView(
    buildPayload({
      eventType: "page_view",
      section,
    }),
  );
}

export async function trackEvent(eventType: string, section?: string): Promise<void> {
  await postPageView(
    buildPayload({
      eventType,
      section,
    }),
  );
}
