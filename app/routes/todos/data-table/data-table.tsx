import type { ColumnDef, TableMeta } from '@tanstack/react-table'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table'

// not sure I need this
declare module '@tanstack/react-table' {
    interface TableMeta<TData> extends Record<string, unknown> {
        updateData: (rowIndex: number, columnId: string, value: string) => void
        deleteData: (rowIndex: number) => void
    }
}
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    initialData: TData[]
    meta: {
        updateData: (rowIndex: number, columnId: string, value: string) => void
        deleteData: (rowIndex: number) => void
    }
}

export function DataTable<TData, TValue>({
    columns,
    initialData,
}: DataTableProps<TData, TValue & Record<string, unknown> & TableMeta<TData>>) {
    const [data, setData] = React.useState(() => [...initialData])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            updateData: (rowIndex: number, columnId: string, value: string) => {
                setData((old) =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex],
                                [columnId]: value,
                            }
                        }
                        return row
                    })
                )
            },
            deleteData: (rowIndex: number) => {
                setData((old) => old.filter((_, index) => index !== rowIndex))
            },
        },
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
