"use client";

import { useContext } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { ActivityTableContext } from "@/context/activityTableContext";

export default function ActivityTable() {
  const activityTableContext = useContext(ActivityTableContext);

  const activities = activityTableContext.activities;
  return (
    <div className="container mx-auto pb-10">
      <DataTable columns={columns} data={activities} />
    </div>
  );
}
