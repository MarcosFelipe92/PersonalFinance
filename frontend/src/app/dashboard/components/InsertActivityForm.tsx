"use client";

import { UserResponseType } from "@/app/api/users/route";
import { CustomAlert, CustomAlertType } from "@/components/global/CustomAlert";
import { CustomDate } from "@/components/global/CustomDate";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActivityTableContext } from "@/context/activityTableContext";
import { AuthContext } from "@/context/authContext";
import { frontendApi } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

enum ActivityType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

const insertFormSchema = z.object({
  date: z.date({ required_error: "Insira uma data" }),
  description: z
    .string({ required_error: "Insira uma descrição" })
    .min(3, { message: "Pelo menos três caracteres" }),
  amount: z.coerce
    .number({ required_error: "Insira um valor" })
    .min(0.01, { message: "O valor deve ser maior que zero" }),

  type: z.nativeEnum(ActivityType, { required_error: "Selecione uma opção" }),
});

type InsertFormType = z.infer<typeof insertFormSchema>;

export default function InsertActivityForm() {
  const [insertMessage, setInsertMessage] = useState<JSX.Element>(<></>);
  const activityTableContext = useContext(ActivityTableContext);
  const authContext = useContext(AuthContext);

  const insertForm = useForm<InsertFormType>({
    resolver: zodResolver(insertFormSchema),
    defaultValues: {
      date: new Date(),
      description: "",
      // @ts-expect-error
      amount: "",
      type: ActivityType.INCOME,
    },
  });

  async function onInsertFormSubmit({
    date,
    description,
    amount,
    type,
  }: InsertFormType) {
    try {
      const user = (
        await frontendApi.post("/auth/token", authContext.recoveryToken())
      ).data as UserResponseType;
      const account = user.account;
      const formatedData = JSON.stringify({
        date: date.toISOString(),
        description,
        amount,
        type,
        account,
      });
      const result = await frontendApi.post("/activities", formatedData);
      const message = (
        <CustomAlert
          title="Atividade inserida com sucesso!"
          message={`${type} foi inserido com sucesso`}
          type={CustomAlertType.SUCCESS}
        />
      );
      setInsertMessage(message);
      activityTableContext.refreshTable();
    } catch (e) {
      const axiosError = e as AxiosError;
      const message = (
        <CustomAlert
          title={`Erro ao inserir a atividade`}
          message={`Erro`}
          type={CustomAlertType.ERROR}
        />
      );
      setInsertMessage(message);
    }
    setTimeout(() => setInsertMessage(<></>), 2500);
  }

  return (
    <div className="space-x-2 p-8">
      <Form {...insertForm}>
        <form
          onSubmit={insertForm.handleSubmit(onInsertFormSubmit)}
          className="flex gap-2 w-full mb-3"
        >
          <FormField
            control={insertForm.control}
            name="date"
            render={({ field }) => {
              return (
                <FormItem className="bg-white w-max">
                  <CustomDate date={field.value} onSelect={field.onChange} />
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={insertForm.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Insira a descrição"
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
            control={insertForm.control}
            name="amount"
            render={({ field }) => {
              return (
                <FormItem className="w-max">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="digite o valor..."
                      className="bg-white w-44"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={insertForm.control}
            name="type"
            render={({ field }) => {
              return (
                <FormItem className="w-max">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-max bg-white">
                        <SelectValue placeholder="Selecione o Tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ActivityType.EXPENSE}>
                        Despesa
                      </SelectItem>
                      <SelectItem value={ActivityType.INCOME}>
                        Entrada
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit">Incluir</Button>
        </form>
        {insertMessage}
      </Form>
    </div>
  );
}
