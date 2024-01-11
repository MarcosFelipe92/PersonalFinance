"use client";
import { Account, AccountResponseType } from "@/app/api/account/route";
import { LoginResponseType } from "@/app/api/auth/login/route";
import { UserResponseType } from "@/app/api/users/route";
import { CustomAlert, CustomAlertType } from "@/components/global/CustomAlert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/authContext";
import { frontendApi } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  login: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(4, { message: "Senha inválida" }),
  phone: z.string(),
});

type FormType = z.infer<typeof loginSchema>;

export default function FormRegister() {
  const [insertMessage, setInsertMessage] = useState<JSX.Element>(<></>);

  const router = useRouter();

  const loginForm = useForm<FormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      cpf: "",
      login: "",
      password: "",
      phone: "",
    },
  });

  async function handlerLoginSubmit({
    name,
    cpf,
    login,
    password,
    phone,
  }: FormType) {
    const role = "USER";
    const data = JSON.stringify({
      name,
      cpf,
      login,
      password,
      phone,
      role,
    });

    try {
      const result = await frontendApi.post("/users/register", data);

      const { login } = result.data as UserResponseType;

      if (login) {
        const message = (
          <CustomAlert
            type={CustomAlertType.ERROR}
            title="Erro no cadastro!"
            message={
              "Erro ao realizar o cadastro, verifique as informações e tente novamente"
            }
          />
        );
        setInsertMessage(message);
        router.push("/");
      }
    } catch (e) {
      const axiosError = e as AxiosError;
      const message = (
        <CustomAlert
          type={CustomAlertType.ERROR}
          title="Erro no login!"
          message={axiosError.message}
        />
      );
      setInsertMessage(message);
    }
    setTimeout(() => setInsertMessage(<></>), 2500);
  }

  return (
    <div className="gap-2 m-2">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(handlerLoginSubmit)}
          className="flex flex-col w-[300px] gap-2"
        >
          <FormField
            control={loginForm.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu nome"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={loginForm.control}
            name="cpf"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu cpf"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={loginForm.control}
            name="login"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="exemplo@gmail.com"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="12345"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={loginForm.control}
            name="phone"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite seu telefone"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
            Entrar
          </Button>
        </form>
        {insertMessage}
      </Form>
    </div>
  );
}
