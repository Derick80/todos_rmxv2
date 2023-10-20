import type { ColumnDef } from "@tanstack/react-table";
import type { ToDoItem } from "~/server/todos.server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Form } from "@remix-run/react";
import { Badge } from "~/components/ui/badge";
export const columns: ColumnDef<ToDoItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const item = row.original;

      item.categories.map((category) => (
        <Badge key={category.id}>{category.label}</Badge>
      ));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return <ActionMenu id={item.id} />;
    },
  },
];

function ActionMenu({
  id,
  setEdit,
}: {
  id: string;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <span className='sr-only'>Open Menu</span>
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => console.log("Edit")}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Form method='POST'>
            <input type='hidden' name='id' value={id} />
            <Button variant='destructive' name='intent' value='delete'>
              Delete
            </Button>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
