import { getAuth } from '@clerk/remix/ssr.server'
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { z } from 'zod'
import { H2, P } from '~/components/ui/typography/typography'
import {
    createTodoItem,
    deleteTodoItem,
    getTodoItems,
    updateToDoContent,
    updateToDoPriority,
    updateToDoStatus,
    updateToDoTitle,
    updateTodoItem,
} from '~/server/todos.server'
import React from 'react'
import { Button } from '~/components/ui/button'
import { useActionData, useLoaderData } from '@remix-run/react'
import { DataTable } from './data-table/data-table'
import { columns } from './data-table/columns'
import { getAllCategories } from '~/server/categories.server'
import CreateToDoComponent from './data-table/create-form'

export async function loader(args: LoaderFunctionArgs) {
    const { userId } = await getAuth(args)

    if (!userId) {
        return redirect('/sign-in')
    }
    const todos = await getTodoItems(userId)
    if (!todos) {
        throw new Error('No todos found')
    }
    const categories = await getAllCategories()
    if (!categories) {
        throw new Error('No categories found')
    }
    return json({
        todos,
        categories,
    })
}
const schema = z.discriminatedUnion('intent', [
    z.object({
        intent: z.literal('create'),
        title: z.string().min(1, { message: 'Title is required' }),
        content: z.string(),
        priority: z.string(),
        status: z.string(),
        notes: z.string(),
        categories: z.string().min(3, { message: 'Category is required' }),
    }),
    z.object({
        intent: z.literal('update'),
        id: z.string(),
        title: z.string().min(1, { message: 'Title is required' }),
        content: z.string(),
        priority: z.string(),
        status: z.string(),
        notes: z.string(),
        categories: z.string().min(3, { message: 'Category is required' }),
    }),
    z.object({
        intent: z.literal('delete'),
        id: z.string(),
    }),
    z.object({
        intent: z.literal('update-title'),
        id: z.string(),
        title: z.string().min(1, { message: 'Title is required' }),
    }),
    z.object({
        intent: z.literal('update-content'),
        id: z.string(),
        content: z.string(),
    }),
    z.object({
        intent: z.literal('update-priority'),
        id: z.string(),
        priority: z.string(),
    }),
    z.object({
        intent: z.literal('update-status'),
        id: z.string(),
        status: z.string(),
    }),
    z.object({
        intent: z.literal('update-notes'),
        id: z.string(),
        notes: z.string(),
    }),
    z.object({
        intent: z.literal('update-categories'),
        id: z.string(),
        categories: z.string().min(3, { message: 'Category is required' }),
    }),
])

export async function action(args: ActionFunctionArgs) {
    const { userId } = (await getAuth(args)) || {}
    if (!userId) {
        return redirect('/sign-in')
    }
    const formData = await args.request.formData()

    // Parse the form data
    const payload = Object.fromEntries(formData)
    const result = schema.safeParse(payload)

    if (!result.success) {
        return json({
            error: result.error.flatten().fieldErrors,
            success: false,
        })
    }

    switch (result.data.intent) {
        case 'create': {
            const todo = await createTodoItem({
                title: result.data.title,
                content: result.data.content,
                priority: result.data.priority,
                status: result.data.status,
                notes: result.data.notes,
                categories: result.data.categories,
                userId,
            })
            return json({
                error: null,
                success: true,
            })
        }
        case 'update': {
            const todo = await updateTodoItem({
                id: result.data.id,
                title: result.data.title,
                content: result.data.content,
                priority: result.data.priority,
                status: result.data.status,
                notes: result.data.notes,
                categories: result.data.categories,
                userId,
            })
            return json({
                error: null,
                success: true,
            })
        }
        case 'delete': {
            const deleted = await deleteTodoItem(result.data.id)
            return json({
                error: null,
                success: true,
            })
        }
        case 'update-title': {
            const todo = await updateToDoTitle({
                id: result.data.id,
                title: result.data.title,
            })
            return json({
                error: null,
                success: true,
            })
        }
        case 'update-content': {
            const todo = await updateToDoContent({
                id: result.data.id,
                content: result.data.content,
            })
            return json({
                error: null,
                success: true,
            })
        }
        case 'update-priority': {
            const todo = await updateToDoPriority({
                id: result.data.id,
                priority: result.data.priority,
            })
            return json({
                error: null,
                success: true,
            })
        }
        case 'update-status': {
            const todo = await updateToDoStatus({
                id: result.data.id,
                status: result.data.status,
            })
            return json({
                error: null,
                success: true,
            })
        }

        default: {
            return json({
                error: 'Invalid intent',
                success: false,
            })
        }
    }
}

export default function TodoRoute() {
    const { todos, categories } = useLoaderData<typeof loader>()
    const actionData = useActionData<typeof action>()
    const [create, setCreate] = React.useState(false)
    const [update, setUpdate] = React.useState(false)

    return (
        <div className="flex flex-col gap-2 md:gap-5">
            <H2>To Do</H2>
            <Button
                variant="ghost"
                onClick={() => setCreate(!create)}
            >
                {create ? 'Cancel' : 'Create'}
            </Button>
            <DataTable
                initialData={todos}
                columns={columns}
                categories={categories}
                setUpdate={setUpdate}
            />
            {create && <CreateToDoComponent setCreate={setCreate} />}
            {update && <P>Update</P>}
        </div>
    )
}
