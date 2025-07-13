import React, { Suspense } from "react";
import ManagmentController from "@/app/components/app/admin/managment/ManagmentController";

export default async function ManagmentPage() {
  return (
    <div className="overflow-auto h-full py-5 px-2 scroll-bar">
      <Suspense fallback={<div>Cargando ...</div>}>
        <ManagmentController />
      </Suspense>
    </div>
  );
}
