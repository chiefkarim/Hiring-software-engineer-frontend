"use client";
import { useState } from "react";
import Logout from "./Logout";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

export function NavBar({
  loggedIn,
  props,
}: {
  loggedIn: boolean;
  props: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className={props}>
      <NavbarContent justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand className=" text-white ">
          <Link href="/">
            <p className="font-semibold text-xl text-white tracking-tight">
              Doc Collab
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="start" className="hidden sm:flex">
        <NavbarItem>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            showAnchorIcon
            href="https://github.com/chiefkarim/Hiring-software-engineer-frontend/tree/development-karim"
            className="  text-white hover:text-white/90 "
          >
            Docs
          </Link>
        </NavbarItem>
        {loggedIn === true ? (
          <NavbarItem>
            <Link
              href="/dashboard"
              className=" text-purple-200 hover:text-white "
            >
              Dashboard
            </Link>
          </NavbarItem>
        ) : null}
      </NavbarContent>
      <NavbarContent justify="end">
        {loggedIn === true ? (
          <Logout />
        ) : (
          <>
            <NavbarItem>
              <Button
                as={Link}
                variant="solid"
                color="primary"
                href="/auth/signup"
              >
                Sign up
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button
                as={Link}
                variant="ghost"
                href="/auth/signin"
                className="text-white hover:text-black "
              >
                Sign in
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {loggedIn === true ? (
          <NavbarMenuItem>
            <Link href="/dashboard" color="foreground">
              Dashboard
            </Link>
          </NavbarMenuItem>
        ) : null}
        <NavbarMenuItem>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            showAnchorIcon
            href="https://github.com/chiefkarim/Hiring-software-engineer-frontend/tree/development-karim"
            color="foreground"
          >
            Docs
          </Link>
        </NavbarMenuItem>
        {loggedIn === false ? (
          <NavbarMenuItem>
            <Link href="/auth/signin" color="primary">
              Sign in
            </Link>
          </NavbarMenuItem>
        ) : null}
      </NavbarMenu>
    </Navbar>
  );
}
