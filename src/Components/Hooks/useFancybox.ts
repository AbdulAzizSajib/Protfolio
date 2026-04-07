"use client";

import { useState, useEffect } from "react";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

type FancyboxOptions = Record<string, unknown>;

export default function useFancybox(options: FancyboxOptions = {}) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!root) {
      return;
    }

    Fancybox.bind(root, "[data-fancybox]", options);

    return () => {
      Fancybox.unbind(root);
    };
  }, [root, options]);

  return [setRoot] as const;
}
