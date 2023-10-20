import type { ColumnDef } from '@tanstack/react-table'
import type { ToDoItem } from '~/server/todos.server'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import {
    DotsVerticalIcon,
} from '@radix-ui/react-icons'
import { Form, useFetcher } from '@remix-run/react'
import { Badge } from '~/components/ui/badge'
import React from 'react'
import { Input } from '~/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select'
import { useDebounceFetcher } from '~/lib/utils'
import { priorityOptions, statusOptions } from './table-data'

export const columns: ColumnDef<ToDoItem>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => {
            const item = row.original
            return (
                <ToDoTitleEdit
                    item={item}
                    name="title"
                />
            )
        },
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => {
            const item = row.original

            return (
                <ToDoPrioritySelect
                    options={priorityOptions}
                    item={item}
                    name="priority"
                />
            )
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const item = row.original

            return (
                <ToDoStatusForm
                    options={statusOptions}
                    item={item}
                    name="status"
                />
            )
        },
    },
    {
        accessorKey: 'categories',
        header: 'Categories',
        cell: ({ row }) => {
            const item = row.original

            if (item.categories.length > 0) {
                return item.categories.map((category) => (
                    <Badge key={category.id}>{category.label}</Badge>
                ))
            }
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const item = row.original

            return <ActionMenu id={item.id} />
        },
    },
]

function ActionMenu({
    id,
}: {
    id: string
}) {
    const deleteFetcher = useFetcher()

    const handleDelete = (id:string) => {
      
        deleteFetcher.submit({
            id,
            intent: 'delete',
        },{
            action: '/todos',
            method: 'POST',
          
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                >
                    <span className="sr-only">Open Menu</span>
                    <DotsVerticalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
            
                <DropdownMenuItem>
                    <deleteFetcher.Form
                        method="POST"
                        >
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleDelete(id)}
                        >
                            Delete
                        </Button>
                        </deleteFetcher.Form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function ToDoTitleEdit({item, name}:{item: ToDoItem, name: string}) {
    const fetcher = useFetcher()
    const titleFetcher = useDebounceFetcher()
    const [value, setValue] = React.useState(item.title)
  
    const handleTitleChange = (value: string) => {
        setValue(value)
        titleFetcher.debounceSubmit(
            {
                title: value,
                id: item.id,
                intent: 'update-title',
            },
            {
                action: '/todos',
                replace: true,
                method: 'POST',
                debounceTimeout: 1000,
            }
        )
    }

    return (
        <fetcher.Form
            method="POST"
        >
            <Input
                type="text"
                name="title"
                className='w-full'
                defaultValue={value}
            
                onChange={(e) => handleTitleChange(e.target.value)}
            />
        </fetcher.Form>
    )
}

type ToDoStatusOptions = {
    options: typeof statusOptions
    item: ToDoItem
    name: string
}
type ToDoPriorityOptions = {
    options: typeof priorityOptions
    item: ToDoItem
    name: string
}
function ToDoPrioritySelect({ options, name, item }: ToDoPriorityOptions) {
    const fetcher = useFetcher()
    const [value, setValue] = React.useState(item.priority)

    const priorityFetcher = useDebounceFetcher()

    const handlePriorityChange = (value: string) => {
        setValue(value)
        priorityFetcher.debounceSubmit(
            {
                priority: value,
                id: item.id,
                intent: 'update-priority',
            },
            {
                action: '/todos',
                method: 'POST',
                replace: true,
            }
        )
    }

    return (
        <fetcher.Form method="POST">
            <Select
                name={name}
                onValueChange={(value) => handlePriorityChange(value)}
                defaultValue={value}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.label}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </fetcher.Form>
    )
}

function ToDoStatusForm({ options, name, item }: ToDoStatusOptions) {
    const fetcher = useFetcher()
    const [value, setValue] = React.useState(item.status)

    const statusFetcher = useDebounceFetcher()

    const handlePriorityChange = (value: string) => {
        setValue(value)
        statusFetcher.debounceSubmit(
            {
                status: value,
                id: item.id,
                intent: 'update-status',
            },
            {
                action: '/todos',
                method: 'POST',

                replace: true,
            }
        )
    }

    return (
        <fetcher.Form method="POST">
            <Select
                name={name}
                onValueChange={(value) => handlePriorityChange(value)}
                defaultValue={value}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.label}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </fetcher.Form>
    )
}
