import { Link, Outlet } from "@remix-run/react";


export default function Index(){
    return (
        <div>
            <nav className="h-16 w-full bg-neutral-800 fixed top-0">
                <div className="h-full flex justify-around items-center">
                    <div>
                        <Link to={"/"}>Home</Link>
                    </div>
                    <div>
                        <Link to={"/dashboard"}>Dashboard</Link>
                    </div>
                    <div>
                        <Link to={"/login"}>Login/Register</Link>
                    </div>
                </div>
            </nav>
            <div className="mt-16">
                <Outlet />
            </div>
        </div>
    )
}