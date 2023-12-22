import ActivityTable from "../components/ActivityTable";
import InsertActivityForm from "../components/InsertActivityForm";

export default function Central() {
  return (
    <div>
      <InsertActivityForm />
      <ActivityTable />
    </div>
  );
}
