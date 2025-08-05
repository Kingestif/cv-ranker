import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { NavBar } from "./NavBar";

export function Home() {
    return (
        <div className='bg-[url("/Wave6.svg")] h-screen bg-no-repeat bg-cover bg-right-bottom flex flex-col'>
            <NavBar/>
            <Hero/>
            <div className='mt-auto mb-8 mx-40 text-white font-bold'><Footer/></div>
        </div>
    )
}