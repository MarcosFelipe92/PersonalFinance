"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Activity = {
  id: number;
  date: Date;
  amount: number;
  description: string;
  type: string;
};

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const aDate = row.getValue("date") as Date;
      const formatedDate =
        aDate.getDate() +
        "/" +
        (aDate.getMonth() + 1) +
        "/" +
        aDate.getFullYear();
      return <p>{formatedDate}</p>;
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const aAmount = row.getValue("amount") as number;
      const type = row.getValue("type");
      const formatedAmount = aAmount.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const classValue = type == "income" ? "text-emerald-500" : "text-red-500";
      return <p className={classValue}>R$ {formatedAmount}</p>;
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    id: "actions",
    header: "ações",
    cell: ({ row }) => {
      return <Button variant="secondary">Remover</Button>;
    },
  },
];
