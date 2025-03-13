import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface ZohoFormDialogProps {
  open: boolean;
  onClose: () => void;
}

const ZohoFormDialog: React.FC<ZohoFormDialogProps> = ({ open, onClose }) => {
  useEffect(() => {
    const wfa_pstMesgFrmFom = (evt: MessageEvent) => {
      if (evt.origin === "https://crm.zoho.in" || evt.origin === "https://crm.zohopublic.in") {
        const loc_obj = JSON.stringify({
          origin: window.location.origin,
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
        });

        const targetOrigin: string = evt.origin;
        evt.source?.postMessage(`prnt_wnd_pg_lc_rc_frm_prwindow_${loc_obj}`, { targetOrigin });
      }
    };

    window.addEventListener("message", wfa_pstMesgFrmFom, false);

    return () => {
      window.removeEventListener("message", wfa_pstMesgFrmFom, false);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] max-w-xl py-5 px-4 font-ubuntu flex justify-center max-h-[90vh] overflow-y-auto">
        <div className="w-full space-y-3">
          <DialogHeader className="flex-row items-center justify-between space-x-4 px-3 mt-4">
            <DialogTitle className="text-lg font-medium">Get in touch</DialogTitle>
            <Image src="/Instient Logo.svg" alt="Logo" width={100} height={100} priority />
          </DialogHeader>
          <div className="px-1">
            <iframe
              width="100%" 
              height="630px"
              src="https://crm.zoho.in/crm/WebFormServeServlet?rid=9c353386eb728e69aa1ae3b9246bac1d5f3d394a8f2a9fb9a67798241975a2dde98bd68a08ccbc5bf2c45b263a51de62gide0b7d24839ef89da96262e44be76b891c78747f8f257187510eaba60b76eacec"
              className="border-none rounded-lg sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[610px]"
              title="Zoho Form"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZohoFormDialog;
