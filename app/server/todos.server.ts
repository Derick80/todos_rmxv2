import type { Category } from "@prisma/client";
import { prisma } from "./prisma.server";
export type ToDoItem = {
  id: string;
  title: string;
  content: string | null;
  priority: string;
  status: string;
  notes: string | null;
  userId: string;
  categories: Category[];
};

type CreateToDoInput = {
  title: string;
  content?: string;
  priority?: string;
  status: string;
  notes?: string;
  userId: string;
  categories: string;
};

type UpdateToDoInput = {
  id: string;
  title?: string;
  content?: string;
  priority?: string;
  status?: string;
  notes?: string;
  categories?: string;
  userId: string;
};

export async function getTodoItems(userId: string) {
  return await prisma.todo.findMany({
    where: {
      userId,
    },
    include: {
      categories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function createTodoItem(data: CreateToDoInput) {
  return await prisma.todo.create({
    data: {
      ...data,
      categories: {
        connectOrCreate: data.categories.split(",").map((category) => ({
          where: { value: category },
          create: { value: category, label: category },
        })),
      },
    },
  });
}

export async function updateTodoItem(data: UpdateToDoInput) {
  return await prisma.todo.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      categories: {
        connectOrCreate: data.categories?.split(",").map((category) => ({
          where: { value: category },
          create: { value: category, label: category },
        })),
      },
    },
  });
}

export async function deleteTodoItem(id: string) {
  return await prisma.todo.delete({
    where: {
      id,
    },
  });
}
