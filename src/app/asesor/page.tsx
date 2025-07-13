import React, { Suspense } from "react";
import CreateNewSellHandler from "@/app/components/app/asesor/modal/CreateNewSellHandler";
import StatHandler from "@/app/components/app/asesor/stats/StatHandler";
import "./page.css";
import AsesorSellsTablehandler from "@/app/components/app/asesor/table/AsesorSellsTableHandler";

export default function Page() {
  return (
    <div className="asesor-page">
      <StatHandler />

      <section className="asesor-table">
        <h2 className="p-4 font-semibold">Ventas actuales</h2>
        <Suspense fallback={<h2>Cargando ventas...</h2>}>
          <AsesorSellsTablehandler />
        </Suspense>

        <CreateNewSellHandler />
      </section>
    </div>
  );
}
