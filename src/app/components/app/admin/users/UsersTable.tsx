import React from "react";
import UsersTableClient from "./UsersTableClient";
import { getUsers } from "@/services/users";

type Props = {};

export default async function UsersTable({}: Props) {
  const data = await getUsers();

  return <UsersTableClient dataSource={data} />;
}
