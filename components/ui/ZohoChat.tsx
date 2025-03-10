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
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
      widgetcode:
        "siq379a18cbee93c0ff40350b13969ef30d3c3c3a92f2eabc5cc04ddea3b7eebf9e698ad21604a227d1199c742d6e9434e7",
      values: {},
      ready: () => {
        // Drag functionality
        setTimeout(() => {
          const chatIcon = document.getElementById("zsiqwidget");
          if (chatIcon) {
            let offsetX = 0, offsetY = 0, isDragging = false;

            chatIcon.onmousedown = (e) => {
              isDragging = true;
              offsetX = e.clientX - chatIcon.getBoundingClientRect().left;
              offsetY = e.clientY - chatIcon.getBoundingClientRect().top;
            };

            document.onmousemove = (e) => {
              if (!isDragging) return;
              chatIcon.style.left = `${e.clientX - offsetX}px`;
              chatIcon.style.top = `${e.clientY - offsetY}px`;
              chatIcon.style.position = "fixed";
            };

            document.onmouseup = () => {
              isDragging = false;
            };
          }
        }, 2000); // Delay to ensure chat widget loads
      },
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

  return null;
};

export default ZohoChat;
