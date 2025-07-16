import React from "react";
import UsersTableClient from "./UsersTableClient";
import { getUsersApi } from "@/lib/api/users";

type Props = {};

export default async function UsersTable({}: Props) {
  const data = await getUsersApi();

  return <UsersTableClient dataSource={data} />;
}
