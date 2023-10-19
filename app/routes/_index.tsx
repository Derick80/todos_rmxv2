import { useUser } from "@clerk/remix";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix To Dos" },
    { name: "description", content: "A simple to do app built with Remix-run" },
  ];
};

export default function Index() {
  const { user } = useUser();

  console.log(user, "user");
  const userId = user?.id;
  console.log(userId, "userId");

  return <div></div>;
}
