import { ActivityTableContextProvider } from "@/context/activityTableContext";
import ActivityTable from "../components/ActivityTable";
import InsertActivityForm from "../components/InsertActivityForm";

export default function Central() {
  return (
    <div>
      <ActivityTableContextProvider>
        <InsertActivityForm />
        <ActivityTable />
      </ActivityTableContextProvider>
    </div>
  );
}
