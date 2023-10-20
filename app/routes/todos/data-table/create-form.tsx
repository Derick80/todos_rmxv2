import { Form, useActionData, useLoaderData } from "@remix-run/react";
import React from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { action, loader } from "../route";
import { Button } from "~/components/ui/button";
import CategoriesDisplay from "./categories-display";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const CreateToDoComponent = () => {
  const { categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<{
    error: {
      title?: string;
      categories?: string;
    };
  }>();

  const [priority, setPriority] = React.useState("Medium");
  const [status, setStatus] = React.useState("To Do");

  return (
    <Form method='POST'>
      <Label htmlFor='title'>Title</Label>
      <Input type='textarea' name='title' />
      {actionData?.error?.title && (
        <Alert variant='destructive'>
          <ExclamationTriangleIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{actionData?.error?.title}</AlertDescription>
        </Alert>
      )}
      <Label htmlFor='Priority'>Priority</Label>
      <Select
        onValueChange={(value) => setPriority(value)}
        defaultValue={priority}
      >
        <SelectTrigger>
          <SelectValue placeholder='Select a priority' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='Low'>Low</SelectItem>
          <SelectItem value='Medium'>Medium</SelectItem>
          <SelectItem value='High'>High</SelectItem>
        </SelectContent>
      </Select>
      <input type='hidden' name='priority' value={priority} />
      <Label htmlFor='status'>Status</Label>
      <Select
        onValueChange={(value) => [setStatus(value), console.log(value)]}
        defaultValue={status}
      >
        <SelectTrigger>
          <SelectValue placeholder='Select a status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='To Do'>To Do</SelectItem>
          <SelectItem value='In Progress'>In Progress</SelectItem>
          <SelectItem value='Completed'>Completed</SelectItem>
          <SelectItem value='On Hold'>On Hold</SelectItem>
        </SelectContent>
      </Select>
      <input type='hidden' name='status' value={status} />
      <Label htmlFor='content'>Content</Label>
      <Input type='textarea' name='content' />
      <Label htmlFor='notes'>Notes</Label>
      <Input type='textarea' name='notes' />
      <Label htmlFor='categories'>Categories</Label>
      <CategoriesDisplay categories={categories} />
      {actionData?.error?.categories && (
        <Alert variant='destructive'>
          <ExclamationTriangleIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{actionData?.error?.categories}</AlertDescription>
        </Alert>
      )}
      <Button type='submit' name='intent' value='create'>
        Create
      </Button>
    </Form>
  );
};

export default CreateToDoComponent;
