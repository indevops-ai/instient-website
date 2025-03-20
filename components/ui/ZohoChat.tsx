"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    $zoho?: {
      salesiq?: {
        widgetcode: string;
        values: Record<string, unknown>;
        ready: () => void;
      };
    };
  }
}

const ZohoChat = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return; // Prevent execution in development

    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
      widgetcode:
        "siq379a18cbee93c0ff40350b13969ef30d3c3c3a92f2eabc5cc04ddea3b7eebf9e698ad21604a227d1199c742d6e9434e7",
      values: {},
      ready: () => {},
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "zsiqscript";
    script.defer = true;
    script.src = "https://salesiq.zoho.in/widget";

    document.body.appendChild(script);

    return () => {
      document.getElementById("zsiqscript")?.remove();
    };
  }, []);

  return null; // No UI element needed
};

export default ZohoChat;
