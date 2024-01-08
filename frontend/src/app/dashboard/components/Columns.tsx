"use client";

import { ActivityType } from "@/app/api/activities/route";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { RemoveButton } from "./RemoveButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ActivityType>[] = [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const aDate = new Date(row.getValue("date"));
      const formatedDate = `${aDate.getDate()}/${
        aDate.getMonth() + 1
      }/${aDate.getFullYear()}`;
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
      const classValue = type == "INCOME" ? "text-emerald-500" : "text-red-500";
      return <p className={classValue}>R$ {formatedAmount}</p>;
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type");
      const tipo = type == "INCOME" ? "Entrada" : "Despesa";
      return <p>{tipo}</p>;
    },
  },
  {
    id: "actions",
    header: "ações",
    cell: ({ row }) => {
      const id = row.original.id;
      const type = row.original.type;

      return <RemoveButton id={id} type={type} />;
    },
  },
];
