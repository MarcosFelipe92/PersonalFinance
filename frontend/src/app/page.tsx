import Link from "next/link";
import Form from "./login/components/FormLogin";

export default function Home() {
  return (
    <div className="h-screen centralizar pb-60">
      <div className="flex flex-col justify-center items-center w-96 h-96 bg-yellow-300 rounded-lg">
        <h1 className="font-bold">Entre com a sua conta</h1>
        <Form />
        <Link href="/cadastro">Ainda não possui conta?</Link>
      </div>
    </div>
  );
}
