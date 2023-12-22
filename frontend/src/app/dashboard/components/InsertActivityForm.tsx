"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

enum ActivityType {
  INCOME = "income",
  EXPENSE = "expense",
}

const insertFormSchema = z.object({
  date: z.date({ required_error: "Insira uma data" }),
  description: z
    .string({ required_error: "Insira uma descrição" })
    .min(3, { message: "Pelo menos três caracteres" }),
  amount: z.coerce
    .number({ required_error: "Insira um valor" })
    .min(0.01, { message: "O valor precisa ser maior que zero" }),
  type: z.nativeEnum(ActivityType, { required_error: "Selecione uma opção" }),
});

type InsertFormType = z.infer<typeof insertFormSchema>;

export default function InsertActivityForm() {
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

  async function onInsertFormSubmit(date: InsertFormType) {
    console.log(date);
  }

  return (
    <div className="flex space-x-2 p-8">
      <Form {...insertForm}>
        <form
          onSubmit={insertForm.handleSubmit(onInsertFormSubmit)}
          className="flex gap-2 w-full"
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
      </Form>
    </div>
  );
}
