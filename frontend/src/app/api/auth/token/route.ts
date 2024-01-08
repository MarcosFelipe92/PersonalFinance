import { backendApi } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

export type TokenResponseType = {
  login?: string;
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
  const token = await request.json();
  const data = JSON.stringify(token);
  let response: TokenResponseType;

  try {
    const result = await backendApi.post("/auth/get", data);
    response = result.data;
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
