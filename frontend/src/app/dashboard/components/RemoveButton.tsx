import { Button } from "@/components/ui/button";
import { ActivityTableContext } from "@/context/activityTableContext";
import { frontendApi } from "@/lib/api";
import { useContext } from "react";

type RemoveButtonProps = {
  id: number;
  type: string;
};

async function removeActivity(id: number, type: string) {
  try {
    const url = `/activities/${id}/${type}`;
    const result = await frontendApi.delete(url);
  } catch (e) {
    alert("Impossivel remover!");
  }
}

export function RemoveButton({ id, type }: RemoveButtonProps) {
  const activityTableContext = useContext(ActivityTableContext);

  return (
    <Button
      variant="secondary"
      onClick={async () => {
        await removeActivity(id, type);
        activityTableContext.refreshTable();
      }}
      key={id}
    >
      Remover
    </Button>
  );
}
