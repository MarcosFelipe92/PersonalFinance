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

type InsertActivityRequestType = {
  date: Date;
  description: string;
  amount: number;
  account: Account;
  type: "EXPENSE" | "INCOME";
};

export async function POST(request: NextRequest) {
  const authToken = request.cookies.get("money-manager.token")?.value;

  if (!authToken) {
    return new Response(JSON.stringify(new Error("Usuário não autorizado")), {
      status: 401,
    });
  }

  try {
    const { date, description, amount, type, account } =
      (await request.json()) as InsertActivityRequestType;
    const jsonData = JSON.stringify({
      date,
      description,
      amount,
      account,
      type,
    });

    if (type == "INCOME") {
      const result = await backendApi.post("/incomes", jsonData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return new Response("", { status: 201 });
    } else {
      const result = await backendApi.post("/expenses", jsonData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return new Response("", { status: 201 });
    }
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
}

export type ActivityType = {
  id: number;
  datte: Date;
  description: string;
  amount: number;
  type: "expense" | "income";
};

export type ActivitiesType = {
  list: ActivityType[];
};

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get("money-manager.token")?.value;

  if (!authToken) {
    return new Response(JSON.stringify(new Error("Usuário não autorizado")), {
      status: 401,
    });
  }

  try {
    const resultI = (
      await backendApi.get("/incomes", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    ).data as ActivityType[];
    const resultE = (
      await backendApi.get("/expenses", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    ).data as ActivityType[];
    const data = [...resultI, ...resultE];

    const activities = { list: data } as ActivitiesType;

    return new Response(JSON.stringify(activities), { status: 200 });
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
}
