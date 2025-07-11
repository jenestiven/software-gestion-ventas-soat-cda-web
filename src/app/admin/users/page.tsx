"use client";

import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Card,
  Statistic,
} from "antd";
import UsersTableClient from "@/app/components/app/admin/users/UsersTableClient";
import PlacesTableClient from "@/app/components/app/admin/users/PlacesTableClient";

export default function UsersPage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr 1fr",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "20px",
        padding: "20px",
        height: "100vh",
      }}
    >
      <div style={{ gridColumn: "span 1" }}>
        <Card>
          <Statistic title="Admin Users" value={10} prefix={<UserOutlined />} />
        </Card>
      </div>
      <div style={{ gridColumn: "span 1" }}>
        <Card>
          <Statistic
            title="Asesor Users"
            value={50}
            prefix={<TeamOutlined />}
          />
        </Card>
      </div>
      <div style={{ gridColumn: "span 1" }}>
        <Card>
          <Statistic title="Places" value={5} prefix={<HomeOutlined />} />
        </Card>
      </div>
      <div style={{ gridColumn: "span 1" }}>
        <Card>
          <Statistic
            title="Active Users"
            value={60}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </div>
      <div style={{ gridColumn: "span 4" }}>
        <UsersTableClient />
      </div>
      <div style={{ gridColumn: "span 4" }}>
        <PlacesTableClient />
      </div>
    </div>
  );
}
