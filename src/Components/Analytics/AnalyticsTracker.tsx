"use client";

import { useEffect } from "react";
import { trackPageView } from "../../lib/analytics";

const HEARTBEAT_MS = 60_000;

const AnalyticsTracker = () => {
  useEffect(() => {
    trackPageView();

    const heartbeatTimer = window.setInterval(() => {
      trackPageView("heartbeat");
    }, HEARTBEAT_MS);

    return () => {
      window.clearInterval(heartbeatTimer);
    };
  }, []);

  return null;
};

export default AnalyticsTracker;
