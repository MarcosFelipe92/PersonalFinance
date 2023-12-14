import ActivityTable from "../components/ActivityTable";
import InsertActivityForm from "../components/InsertActivityForm";

export default function Expense() {
  return (
    <div>
      <InsertActivityForm />
      <ActivityTable />
    </div>
  );
}
