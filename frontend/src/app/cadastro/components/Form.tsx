"use clent";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Form() {
  return (
    <form className="flex flex-col items-center w-[300px] gap-2">
      <Input className="bg-white" type="text" placeholder="Seu nome" />
      <Input className="bg-white" type="text" placeholder="Seu cpf" />
      <Input className="bg-white" type="email" placeholder="Seu email" />
      <Input className="bg-white" type="password" placeholder="Sua senha" />
      <Input className="bg-white" type="text" placeholder="Seu telefone" />
      <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
        Entrar
      </Button>
    </form>
  );
}
