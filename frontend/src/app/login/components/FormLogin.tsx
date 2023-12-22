"use client";
import { LoginResponseType } from "@/app/api/auth/login/route";
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
  login: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(4, { message: "Senha inválida" }),
});

type FormType = z.infer<typeof loginSchema>;

export default function FormLogin() {
  const [message, setMessage] = useState(<></>);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const loginForm = useForm<FormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function handlerLoginSubmit({ login, password }: FormType) {
    const data = JSON.stringify({
      login,
      password,
    });
   
    try {
      const result = await frontendApi.post("/auth/login", data);
      
      const { token, error } = result.data as LoginResponseType;
      const account = 

      if (token) {
        authContext.signIn(token);
        router.push("/dashboard/central");
        console.log();
        
      } else {
        const message = (
          <CustomAlert
            type={CustomAlertType.ERROR}
            title="Erro no login!"
            message={error || "Erro desconhecido"}
          />
        );
        setMessage(message);
      }
    } catch (e) {
      const axiosError = e as AxiosError;
      <CustomAlert
        type={CustomAlertType.ERROR}
        title="Erro no login!"
        message={axiosError.message}
      />;
      setMessage(message);
    }
  }

  return (
    <div className="gap-2 m-2">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(handlerLoginSubmit)}
          className="flex flex-col w-[300px] gap-2"
        >
          {message}
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

          <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
