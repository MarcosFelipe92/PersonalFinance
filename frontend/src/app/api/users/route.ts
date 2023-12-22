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

export type UserInsertType = {
  cpf: string;
  name: string;
  login: string;
  password: string;
  phone: string;
  role: string;
};

type UserResponseType = {
  cpf?: string;
  name?: string;
  login?: string;
  password?: string;
  phone?: string;
  role?: string;
  error?: string;
};

export async function POST(request: NextRequest) {
  const user = await request.json();
  const data = JSON.stringify(user);
  let response: UserResponseType;

  try {
    const result = await backendApi.post("users/register", data);
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

  let response: UserResponseType;

  try {
    const result = await backendApi.get(`users/${id}`);
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
