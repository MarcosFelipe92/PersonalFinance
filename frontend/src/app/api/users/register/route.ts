import { backendApi } from "@/lib/api";
import { NextRequest } from "next/server";
import { Expense, Income } from "../../account/route";

type Account = {
  id: number;
  balance: number;
  incomes: Income;
  expenses: Expense;
};

type UserResponseType = {
  cpf: string;
  name: string;
  login: string;
  password: string;
  phone: string;
  role: string;
  account: Account;
};

export async function POST(request: NextRequest) {
  const user = (await request.json()) as UserResponseType;

  try {
    const accountResult = (
      await backendApi.post("/accounts", {
        balance: "0",
      })
    ).data as Account;
    user.account = accountResult;

    const data = JSON.stringify(user);

    const result = await backendApi.post("users/register", data);

    return new Response(JSON.stringify(result));
  } catch (e) {
    return new Response(JSON.stringify("Erro"));
  }
}
