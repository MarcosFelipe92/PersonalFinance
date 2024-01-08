"use client";

import { ActivitiesType, ActivityType } from "@/app/api/activities/route";
import { frontendApi } from "@/lib/api";
import { createContext, useEffect, useState } from "react";

type ActivityTableContextType = {
  activities: ActivityType[];
  refreshTable: () => void;
};

export const ActivityTableContext = createContext(
  {} as ActivityTableContextType
);

async function getData(): Promise<ActivityType[]> {
  let data: ActivityType[] = [];
  try {
    const result = await frontendApi.get("/activities");
    const { list } = result.data as ActivitiesType;

    if (list) {
      data = list;
    }
  } catch (e) {
    data = [];
  }
  return data;
}

export function ActivityTableContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activities, setActivities] = useState<ActivityType[]>([]);

  useEffect(() => {
    getData().then((response) => {
      setActivities(response);
    });
  }, []);

  function refreshTable() {
    getData().then((response) => {
      setActivities(response);
    });
  }

  return (
    <ActivityTableContext.Provider value={{ activities, refreshTable }}>
      {children}
    </ActivityTableContext.Provider>
  );
}
