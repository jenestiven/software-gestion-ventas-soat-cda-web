import React, { Suspense } from "react";
import CreateNewSellHandler from "@/app/components/app/asesor/modal/CreateNewSellHandler";
import StatHandler from "@/app/components/app/asesor/stats/StatHandler";
import AsesorSellsTablehandler from "@/app/components/app/asesor/table/AsesorSellsTableHandler";
import "./page.css";

export default function Page() {
  return (
    <div className="asesor-page">
      <StatHandler />

      <section className="asesor-table">
        <div>
          <Suspense fallback={<h2>Cargando ventas...</h2>}>
            <AsesorSellsTablehandler />
          </Suspense>
        </div>

        <CreateNewSellHandler />
      </section>
    </div>
  );
}
