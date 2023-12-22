import { backendApi } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

export type LoginResponseType = {
  token?: string;
  error?: string;
};

type BackendLoginErrorResponseType = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
};

export async function POST(request: NextRequest) {
  const { login, password } = await request.json();

  const data = JSON.stringify({ login, password });

  let response: LoginResponseType;

  try {
    const result = await backendApi.post("/users/login", data);
    const { token } = result.data;
    response = { token };
  } catch (e) {
    const axiosError = e as AxiosError;
    const { status, error } = axiosError.response
      ?.data as BackendLoginErrorResponseType;

    if (status) {
      response = { error };
    } else {
      response = { error: axiosError.message };
    }
  }

  return new Response(JSON.stringify(response));
}
