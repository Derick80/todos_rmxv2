import type { Category } from '@prisma/client'
import { prisma } from './prisma.server'
export type ToDoItem = {
    id: string
    title: string
    content: string | null
    priority: string
    status: string
    notes: string | null
    userId: string
    categories: Category[]
}

export type ToDOItemTableEdit = ToDoItem & {
    updateTodoItem: (data: UpdateToDoInput) => Promise<ToDoItem>
}
type CreateToDoInput = {
    title: string
    content?: string
    priority?: string
    status: string
    notes?: string
    userId: string
    categories: string
}

type UpdateToDoInput = {
    id: string
    title?: string
    content?: string
    priority?: string
    status?: string
    notes?: string
    categories?: string
    userId: string
}

export async function getTodoItems(userId: string) {
    return await prisma.todo.findMany({
        where: {
            userId,
        },
        include: {
            categories: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
}
export async function createTodoItem(data: CreateToDoInput) {
    return await prisma.todo.create({
        data: {
            ...data,
            categories: {
                connectOrCreate: data.categories.split(',').map((category) => ({
                    where: { value: category },
                    create: { value: category, label: category },
                })),
            },
        },
    })
}

export async function updateTodoItem(data: UpdateToDoInput) {
    return await prisma.todo.update({
        where: {
            id: data.id,
        },
        data: {
            ...data,
            categories: {
                connectOrCreate: data.categories
                    ?.split(',')
                    .map((category) => ({
                        where: { value: category },
                        create: { value: category, label: category },
                    })),
            },
        },
    })
}

export async function deleteTodoItem(id: string) {
    return await prisma.todo.delete({
        where: {
            id,
        },
    })
}

type UpdateToDoTitle = {
    id: string
    title: string
}
export async function updateToDoTitle({ id, title }: UpdateToDoTitle) {
    return await prisma.todo.update({
        where: {
            id,
        },
        data: {
            title,
        },
    })
}

type UpdateToDoContent = {
    id: string
    content: string
}
export async function updateToDoContent({ id, content }: UpdateToDoContent) {
    return await prisma.todo.update({
        where: {
            id,
        },
        data: {
            content,
        },
    })
}

type UpdateToDoPriority = {
    id: string
    priority: string
}
export async function updateToDoPriority({ id, priority }: UpdateToDoPriority) {
    return await prisma.todo.update({
        where: {
            id,
        },
        data: {
            priority,
        },
    })
}

type UpdateToDoStatus = {
    id: string
    status: string
}

export async function updateToDoStatus({ id, status }: UpdateToDoStatus) {
    return await prisma.todo.update({
        where: {
            id,
        },
        data: {
            status,
        },
    })
}

type UpdateToDoNotes = {
    id: string
    notes: string
}
export async function updateToDoNotes({ id, notes }: UpdateToDoNotes) {
    return await prisma.todo.update({
        where: {
            id,
        },
        data: {
            notes,
        },
    })
}

type UpdateToDoCategories = {
    id: string
    categories: string
}
export async function updateToDoCategories({
    id,
    categories,
}: UpdateToDoCategories) {
    return await prisma.todo.update({
        where: {
            id,
        },
        data: {
            categories: {
                connectOrCreate: categories?.split(',').map((category) => ({
                    where: { value: category },
                    create: { value: category, label: category },
                })),
            },
        },
    })
}
