import Logout from "./Logout";

export default function NavBar({ loggedIn }: { loggedIn: boolean }) {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-purple p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
       <a href="/"><span className="font-semibold text-xl tracking-tight">Big Mama</span></a> 
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-purple-200 border-purple-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/chiefkarim/Hiring-software-engineer-frontend/tree/development-karim"
            className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4"
          >
            Docs
          </a>
          {loggedIn === true ? (<a          
            href="/dashboard"
            className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4"
          >
            Dashboard
          </a>) : ""}
          
        </div>
        
        {loggedIn === true ? (
          <Logout />
        ) : (
          <>
            <div>
              <a
                href="/auth/signup"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple hover:bg-white mt-4 lg:mt-0"
              >
                Sign up
              </a>
            </div>
            <div className="mx-5">
              <a
                href="/auth/signin"
                className="inline-block text-sm px-4 py-2 leading-none border rounded  text-purple bg-white hover:border-white hover:bg-opacity-[.8] hover:bg-white mt-4 lg:mt-0"
              >
                Sign in
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
