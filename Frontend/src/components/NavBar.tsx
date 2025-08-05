import { ArrowRight } from "lucide-react"
export function NavBar(){
    return (
        <div className="flex justify-between mx-40 my-5 font-mono items-center">
            <div className="font-bold text-xl text-blue-600">CVision</div>
            <div className="flex gap-10">
                <div>Home</div>
                <div>Services</div>
                <div>Contact</div>
                <div>About</div>
            </div>
            <div className="flex gap-5 rounded-full px-2 py-1 bg-blue-500 text-white items-center">
                <div className="font-bold p-2">TRY FOR FREE</div>
                <ArrowRight className="w-5 h-5"/>
            </div>
        </div>
    )
}