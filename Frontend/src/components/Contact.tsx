import { Linkedin, Mail, Phone } from "lucide-react"
import { NavBar } from "./NavBar"
import { Footer } from "./Footer"
import { useState } from "react"
import Lottie from "lottie-react"
import checkAnim from "../../src/assets/Success.json"; 


export function Contact(){
    const [sent, setSent] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    }

    return (
        <div className="flex flex-col h-screen justify-around">
            <NavBar/>
            <div className="flex justify-around mx-80 mt-20 font-mono py-10 ">
                <div className="flex flex-col gap-10 w-150">
                    <div className="flex flex-col gap-5">
                        <div className="text-gray-600 font-medium">WE'RE HERE TO HELP YOU</div>
                        <div className="text-5xl"><span className="font-bold">Discuss</span> Your Software Needs</div>
                        <div className="text-gray-600">Are you looking for top-quality software tailored to your needs? Reach out to me.</div>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div className="flex gap-5">
                            <Mail className="text-blue-600"/>
                            <div>
                                <div className="text-gray-600">Email</div>
                                <div>estifanoszinabuabebe@gmail.com</div>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <Phone className="text-blue-600"/>
                            <div>
                                <div className="text-gray-600">Phone number</div>
                                <div>+251-942-143-127</div>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <Linkedin className="text-blue-600"/>
                            <div>
                                <div className="text-gray-600">Linkedin</div>
                                <a href="https://www.linkedin.com/in/estif/" className="text-blue-600 hover:underline">https://www.linkedin.com/in/estif/</a>
                            </div>
                        </div>
                    </div>
                </div>

                <form 
                    className="flex flex-col justify-between px-10 shadow-[0_0_30px_0.1px_rgba(0,0,0,0.2)] w-90 gap-5 rounded-2xl p-10" 
                    onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <label className="text-gray-700">
                            Name
                            <br/>
                            <input required className="border rounded px-3 py-2 w-full border-gray-300 focus:border-gray-500 focus:outline-none text-sm" type="text" placeholder="Jane smith"/>
                        </label>
                        <label className="text-gray-700">
                            Email
                            <br/>
                            <input required className="border rounded px-3 py-2 w-full border-gray-300 focus:border-gray-500 focus:outline-none text-sm" type="text" placeholder="janesmith@gmail.com" />
                        </label>
                        <label className="text-gray-700">
                            Message
                            <br/>
                            <textarea required className="border rounded px-3 py-2 w-full border-gray-300 focus:border-gray-500 focus:outline-none text-sm" placeholder="Type your message" name="" id=""></textarea>
                        </label>
                    </div>

                    <button className="flex justify-center bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={sent} 
                        > 
                        {sent ? (
                            <div className="flex">
                                <Lottie animationData={checkAnim} loop={false} style={{ width: 30, height: 30 }} />
                                <div>sent!</div>
                            </div>
                        ) : (
                            "Send"
                        )}
                    </button>
                </form>

            </div>
            
            <div className=" mt-10 mx-40 font-semibold text-sm bg-blue-500 px-5 py-5 rounded-2xl text-white ">
                <Footer />
            </div>
        </div>
    )
}