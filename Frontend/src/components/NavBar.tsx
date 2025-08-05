import { ArrowRight } from "lucide-react"
export function NavBar(){
    return (
        <div className="flex justify-between mx-40 my-5 font-mono items-center">
            <div className="font-bold text-xl">CVision</div>
            <div className="flex gap-10">
                <div>Home</div>
                <div>Services</div>
                <div>Contact</div>
                <div>About</div>
            </div>
            <div className="flex gap-5 border-2 border-gray-500 rounded-full px-2 py-1">
                <div className="">TRY IT FOR FREE</div>
                <ArrowRight className="w-5 h-5"/>
            </div>
        </div>
    )
}