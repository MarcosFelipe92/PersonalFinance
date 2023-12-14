import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InsertActivityForm() {
  return (
    <div className="flex space-x-2 p-4">
      <Input type="date" className="bg-white max-w-[10rem]" />
      <Input
        type="text"
        placeholder="Insira a descrição"
        className="bg-white"
      />
      <Input
        type="number"
        placeholder="digite o valor..."
        className="bg-white w-64"
      />
      <Select>
        <SelectTrigger className="w-80 bg-white">
          <SelectValue placeholder="Selecione o Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="expense">Despesa</SelectItem>
          <SelectItem value="income">Entrada</SelectItem>
        </SelectContent>
      </Select>
      <Button>Pesquisar</Button>
    </div>
  );
}
