import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createThemeCookie } from "~/server/theme.server";

export async function loader({ request }: DataFunctionArgs) {
  return redirect("/");
}

export async function action({ request, params }: DataFunctionArgs) {
  const { theme = "system" } = await request.json();
  return createThemeCookie(request, theme);
}
