import React, { Suspense } from "react";
import ManagmentController from "@/app/components/app/admin/managment/ManagmentController";
import { Skeleton } from "../page";

export default async function ManagmentPage() {
  return (
    <div className="overflow-auto h-full py-5 px-2 scroll-bar">
      <Suspense fallback={<Skeleton />}>
        <ManagmentController />
      </Suspense>
    </div>
  );
}
