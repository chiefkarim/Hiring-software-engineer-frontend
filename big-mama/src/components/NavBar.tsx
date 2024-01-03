import Logout from "./Logout";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function NavBar({ loggedIn }: { loggedIn: boolean }) {
  return (
    <Navbar className=" bg-purple ">
      <NavbarBrand className="flex-grow-0 text-white ">
        <Link  href="/">
          <p className="font-semibold text-xl text-white tracking-tight">Big Mama</p>
        </Link>
      </NavbarBrand>
      <NavbarContent  justify="start">
        <NavbarItem>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            showAnchorIcon
            href="https://github.com/chiefkarim/Hiring-software-engineer-frontend/tree/development-karim"
            className="  text-purple-200 hover:text-white "
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
          ) : (
            ""
          )}
        

       
      </NavbarContent>
      <NavbarContent justify="end">
      {loggedIn === true ? (
          <Logout />
        ) : (
          <>
            <Button
              as={Link}
              variant="faded"
              color="secondary"
              href="/auth/signup"
            >
              Sign up
            </Button>

            <Button
              as={Link}
              variant="ghost"
              href="/auth/signin"
              className="text-white hover:text-purple "
            >
              Sign in
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
