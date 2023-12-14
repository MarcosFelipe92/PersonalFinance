"use client";

import Link from "next/link";
import Form from "./components/Form";

let variavel = "Cliquue aqui";

function teste() {
  console.log("teste");
}

export default function Cadastro() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-96 h-96 bg-yellow-300 rounded-lg">
        <h1 className="font-bold">Crie a sua conta</h1>
        <Form />
        <Link href="/">Já possui conta?</Link>
      </div>
    </div>
  );
}
