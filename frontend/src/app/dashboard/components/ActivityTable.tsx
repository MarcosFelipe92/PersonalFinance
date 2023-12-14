import { Activity, columns } from "./Columns";
import { DataTable } from "./DataTable";

const data: Activity[] = [
  {
    id: 1,
    date: new Date("11-25-2023"),
    description: "Conta de Luz",
    amount: 250.0,
    type: "expense",
  },
  {
    id: 2,
    date: new Date("10-25-2022"),
    description: "Conta de água",
    amount: 150.0,
    type: "expense",
  },
  {
    id: 3,
    date: new Date("08-02-2022"),
    description: "Salário",
    amount: 3250.0,
    type: "income",
  },
  {
    id: 4,
    date: new Date("01-08-2022"),
    description: "Venda de site",
    amount: 850.0,
    type: "income",
  },
];

function getData(): Activity[] {
  // Fetch data from your API here.
  return data;
}

export default function ActivityTable() {
  const data = getData();

  return (
    <div className="container mx-auto pb-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
