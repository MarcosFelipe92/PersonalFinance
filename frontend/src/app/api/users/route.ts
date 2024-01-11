import { backendApi } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { Account } from "../account/route";

type BackendErrorResponseType = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
};

export type UserResponseType = {
  cpf: string;
  name: string;
  login: string;
  password: string;
  phone: string;
  role: string;
  account: Account;
};

export async function PUT(request: NextRequest) {
  const user = await request.json();
  const data = JSON.stringify(user);
  let response: UserResponseType;

  try {
    const result = await backendApi.put("users", data);
    response = result.data;
  } catch (e) {
    const axiosError = e as AxiosError;
    const { status, error } = axiosError.response
      ?.data as BackendErrorResponseType;

    if (status) {
      return new Response(
        JSON.stringify(new AxiosError(error, status.toString())),
        { status }
      );
    } else {
      return new Response(JSON.stringify(axiosError.message), {
        status: axiosError.status,
      });
    }
  }
  return new Response(JSON.stringify(response));
}

export async function GET(request: NextRequest) {
  const id = await request.json();
  const authToken = request.cookies.get("money-manager.token")?.value;

  let response: UserResponseType;

  try {
    const result = await backendApi.get(`users/${id}`, {
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
      return new Response(
        JSON.stringify(new AxiosError(error, status.toString())),
        { status }
      );
    } else {
      return new Response(JSON.stringify(axiosError.message), {
        status: axiosError.status,
      });
    }
  }
  return new Response(JSON.stringify(response));
}
