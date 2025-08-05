import { ArrowRight } from "lucide-react"
export function Hero(){
    return (
        <div className="flex flex-col items-center mt-20 gap-15 font-mono">
            <div className="font-bold text-2xl text-gray-600"> Work Smarter Not Harder</div>
            <div className="font-bold text-6xl w-170 text-center text-blue-500"> Rank resumes with AI Vision</div>
            <div className="text-sm w-200 text-center"> Take control of your time with our all-in-one productive app. Upload resumes, Get ranked results within seconds.</div>
            <div className="flex gap-2 px-6 py-3 rounded-full font-semibold border-2 border-transparent bg-transparent shadow-[0_0_20px_4px_rgba(59,130,246,0.5)] ">
                <div >Try it for free</div>
                <ArrowRight className="w-5 h-5"/>
            </div>
        </div>
    )
}