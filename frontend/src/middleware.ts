import { NextRequest, NextResponse } from "next/server";

export default async function middleWare(request: NextRequest) {
  const authToken = request.cookies.get("money-manager.token")?.value;

  if (authToken) {
    const isTokenValid = await validationToken(authToken);

    if (isTokenValid) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/dashboard/central"],
};

type BackendValidateTokenResponseType = {
  valid: boolean;
};

type BackendValidateTokenRequestType = {
  token: string;
};

async function validationToken(token: string) {
  let isValid = false;

  try {
    const response = await fetch("http://localhost:8080/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token } as BackendValidateTokenRequestType),
    });

    const jsonResponse = await response.json();

    isValid = jsonResponse;
  } catch (e) {
    isValid = false;
  }

  return isValid;
}
