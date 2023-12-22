import { backendApi } from "@/lib/api";
import { NextRequest } from "next/server";

type BackendLoginErrorResponseType = {
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
  type: "expense" | "income";
};

export async function POST(request: NextRequest) {
  const authToken = request.cookies.get("money-manager.token")?.value;

  if (!authToken) {
    return new Response(JSON.stringify(new Error("Usuário não autorizado")), {
      status: 401,
    });
  }

  try {
    const data = (await request.json()) as InsertActivityRequestType;
    const jsonData = JSON.stringify(data);
    if (data.type == "income") {
      const result = backendApi.post("/incomes", jsonData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else {
      const result = backendApi.post("/expenses");
    }
  } catch (e) {}
}
