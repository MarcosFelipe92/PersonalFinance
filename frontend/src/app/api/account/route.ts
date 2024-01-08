import { backendApi } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { string } from "zod";

type BackendErrorResponseType = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
};

export type Income = {
  id: number;
  description: string;
  amount: number;
  date: Date;
  type: string;
  Account: Account;
};

export type Expense = {
  id: number;
  description: string;
  amount: number;
  date: Date;
  type: string;
  Account: Account;
};

export type Account = {
  id: number;
  balance: number;
  expenses: Expense[];
  incomes: Income[];
};

export type AccountResponseType = {
  id?: number;
  balance?: number;
  error?: string;
};

export async function POST(request: NextRequest) {
  const authToken = request.cookies.get("money-manager.token")?.value;
  const balance = await request.json();
  const data = JSON.stringify(balance);
  let response: AccountResponseType;

  try {
    const result = await backendApi.post("accounts", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    response = result.data;
  } catch (e) {
    const axiosError = e as AxiosError;
    const { status, error } = axiosError.response
      ?.data as BackendErrorResponseType;

    if (status) {
      response = { error };
    } else {
      response = { error: axiosError.message };
    }
  }
  return new Response(JSON.stringify(response));
}

export async function GET(request: NextRequest) {
  const id = await request.json();

  let response: AccountResponseType;

  try {
    const result = await backendApi.get(`accounts/users/${id}`);
    response = result.data;
  } catch (e) {
    const axiosError = e as AxiosError;
    const { status, error } = axiosError.response
      ?.data as BackendErrorResponseType;

    if (status) {
      response = { error };
    } else {
      response = { error: axiosError.message };
    }
  }
  return new Response(JSON.stringify(response));
}
