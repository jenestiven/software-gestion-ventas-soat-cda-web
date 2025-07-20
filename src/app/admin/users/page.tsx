import React, { Suspense } from "react";
import UsersTable from "@/app/components/app/admin/users/UsersTable";
import UsersCards from "@/app/components/app/admin/users/UsersCards";
import PlacesTable from "@/app/components/app/admin/users/PlacesTable";
import { getUsersStats } from "@/services/users";
import "@/app/admin/page.css";

export default async function UsersPage() {
  const stats = await getUsersStats();

  return (
    <div className="grid grid-cols-4 gap-5 px-2 py-5 h-full overflow-y-auto scroll-bar">
      <UsersCards stats={stats} />
      <div style={{ gridColumn: "span 4" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <UsersTable />
        </Suspense>
      </div>
      <div style={{ gridColumn: "span 4" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <PlacesTable />
        </Suspense>
      </div>
    </div>
  );
}
