import { useUser } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { z } from "zod";
import {
  createTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from "~/server/todos.server";

export async function loader(args: LoaderFunctionArgs) {
  const { userId, sessionId, getToken } = await getAuth(args);

  if (!userId) {
    return redirect("/sign-in");
  }

  return json({
    message: "Hello from the loader",
  });
}
const schema = z.discriminatedUnion("intent", [
  z.object({
    intent: z.literal("create"),
    title: z.string(),
    content: z.string(),
    priority: z.string(),
    status: z.string(),
    notes: z.string(),
    categories: z.string(),
  }),
  z.object({
    intent: z.literal("update"),
    id: z.string(),
    title: z.string(),
    content: z.string(),
    priority: z.string(),
    status: z.string(),
    notes: z.string(),
    categories: z.string(),
  }),
  z.object({
    intent: z.literal("delete"),
    id: z.string(),
  }),
]);
export async function action(args: ActionFunctionArgs) {
  const { userId } = (await getAuth(args)) || {};
  if (!userId) {
    return redirect("/sign-in");
  }
  const formData = await args.request.formData();

  // Parse the form data
  const payload = Object.fromEntries(formData);
  const result = schema.safeParse(payload);

  if (!result.success) {
    return json({
      payload,
      error: result.error.flatten().fieldErrors,
    });
  }

  switch (result.data.intent) {
    case "create": {
      const todo = await createTodoItem({
        title: result.data.title,
        content: result.data.content,
        priority: result.data.priority,
        status: result.data.status,
        notes: result.data.notes,
        categories: result.data.categories,
        userId,
      });
      return json({ todo });
    }
    case "update": {
      const todo = await updateTodoItem({
        id: result.data.id,
        title: result.data.title,
        content: result.data.content,
        priority: result.data.priority,
        status: result.data.status,
        notes: result.data.notes,
        categories: result.data.categories,
        userId,
      });
      return json({ todo });
    }
    case "delete": {
      const deleted = await deleteTodoItem(result.data.id);
      return json({ deleted });
    }
    default: {
      return json({
        payload,
        error: "Invalid intent",
      });
    }
  }
}

export default function TodoRoute() {
  const { user } = useUser();

  return <div className=''>put stuff here</div>;
}
