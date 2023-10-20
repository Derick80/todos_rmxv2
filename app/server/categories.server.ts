import { prisma } from "./prisma.server";

export async function getAllCategories() {
  return await prisma.category.findMany();
}
