import { ArrowRight } from "lucide-react"
export function NavBar(){
    return (
        <div className="flex justify-between mx-40 my-5 font-mono items-center">
            <a href="" className="font-bold text-xl text-blue-600">CVision</a>
            <div className="flex gap-10">
                <a href="">Home</a>
                <a href="">Services</a>
                <a href="">Contact</a>
                <a href="">About</a>
            </div>
            <a href="" className="flex gap-2 rounded-full px-2 pr-5 py-1 bg-blue-500 text-white items-center hover:shadow-[0_0_10px_2px_rgba(59,130,246,0.7)] duration-200">
                <div className="font-bold p-2">TRY FOR FREE</div>
                <ArrowRight className="w-5 h-5"/>
            </a>
        </div>
    )
}