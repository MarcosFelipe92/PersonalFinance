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

type DeleteActivityType = {
  params: {
    id: number;
  };
};

export async function DELETE(
  request: NextRequest,
  { params }: DeleteActivityType
) {
  const authToken = request.cookies.get("money-manager.token")?.value;

  if (!authToken) {
    return new Response(JSON.stringify(new Error("Usuário não autorizado")), {
      status: 401,
    });
  }

  const url = request.url; // Obtém a URL completa da requisição
  const urlA = url.split("/");
  const id = urlA[5];
  const type = urlA[6];

  try {
    if (type == "INCOME") {
      const url = `/incomes/${params.id}`;

      const result = await backendApi.delete(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return new Response("", { status: 200 });
    } else {
      const url = `/expenses/${params.id}`;
      const result = await backendApi.delete(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return new Response("", { status: 200 });
    }
  } catch (e) {
    const axiosError = e as AxiosError;

    const { status, error } = axiosError.response
      ?.data as BackendErrorResponseType;

    if (status) {
      return new Response(
        JSON.stringify(new AxiosError(error, status.toString()))
      );
    } else {
      return new Response(JSON.stringify(axiosError.message), {
        status: axiosError.status,
      });
    }
  }
}
