import { ArrowRight } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
export function NavBar(){
    const location = useLocation();
    return (
        <div className="flex justify-between mx-40 my-5 font-mono items-center">
            <Link to="/" className="font-bold text-xl text-blue-600">CVision</Link>
            <div className="flex gap-10">
                <Link to="/">Home</Link>
                <a href="">Services</a>
                <a href="">Contact</a>
                <a href="">About</a>
            </div>

            {location.pathname === '/' && (     //conditionally render "try for free" part
                <Link to="/upload" className="flex gap-2 rounded-full px-2 pr-5 py-1 bg-blue-500 text-white items-center hover:shadow-[0_0_10px_2px_rgba(59,130,246,0.7)] duration-200">
                    <div className="font-bold p-2">TRY FOR FREE</div>
                    <ArrowRight className="w-5 h-5"/>
                </Link>
            )}
        </div>
    )
}