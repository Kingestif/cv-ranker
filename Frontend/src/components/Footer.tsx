import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer(){
    return (
        <div className="flex gap-30 justify-between font-mono">
            <div className="text-2xl">CVision</div>
            <div className="flex flex-col">
                <div className="flex gap-5">
                    <div>About</div>
                    <div>Contact</div>
                    <div>Support</div>
                </div>
                <div>©2025 CVision. All right reserved.</div>
            </div>
            <div className="flex gap-5">
                <Linkedin />
                <Github />
                <Twitter />
            </div>
        </div> 
    )
}                                                                                                                                                                                                                                                                       