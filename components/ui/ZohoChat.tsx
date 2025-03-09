"use client";
import { useEffect } from "react";

const ZohoChat = () => {
  useEffect(() => {
    (window as any).$zoho = (window as any).$zoho || {};
    (window as any).$zoho.salesiq = (window as any).$zoho.salesiq || {
      widgetcode: "siq379a18cbee93c0ff40350b13969ef30d3c3c3a92f2eabc5cc04ddea3b7eebf9e698ad21604a227d1199c742d6e9434e7",
      values: {},
      ready: function () {},
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
