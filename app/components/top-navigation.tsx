import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/remix";
import { NavLink } from "@remix-run/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { H1 } from "./ui/typography/typography";
import { ThemeToggle } from "./theme/theme-toggle";

const TopNavigation = () => {
  return (
    <div className='flex justify-around gap-2 md:gap-5 items-center p-4 '>
      <H1>@Todos</H1>
      <DesktopMenu />
      <MobileMenu />
      <ThemeToggle />
      <ul>
        <li>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </li>
      </ul>
    </div>
  );
};

export default TopNavigation;

export const navLinks = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "todos",
    label: "Todos",
    href: "/todos",
  },
  {
    id: "beta",
    label: "Beta",
    href: "/beta",
  },
];

function DesktopMenu() {
  return (
    <ul className='hidden md:flex space-x-4'>
      {navLinks.map((link) => (
        <li key={link.id}>
          <NavLink
            className={({ isActive }) =>
              `nav-link ${isActive ? "underline" : ""}`
            }
            to={link.href}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
function MobileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='md:hidden'>
        <Button variant='outline' size='icon'>
          <HamburgerMenuIcon />
          <span className='sr-only'>Login/Register</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {navLinks.map((link) => (
          <DropdownMenuItem key={link.id} asChild>
            <NavLink
              className={({ isActive }) => ` ${isActive ? "underline" : ""}`}
              to={link.href}
            >
              {link.label}
            </NavLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
