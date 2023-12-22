import { backendApi } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

type BackendErrorResponseType = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
};

export type AccountInsertType = {
  balance: number;
  user: number;
};

type AccountResponseType = {
  balance?: number;
  user?: number;
  error?: string;
};

export async function POST(request: NextRequest) {
  const { balance, user } = await request.json();
  const data = JSON.stringify({ balance, user });
  let response: AccountResponseType;

  try {
    const result = await backendApi.post("accounts", data);
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
