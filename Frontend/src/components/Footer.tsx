import { Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer(){
    return (
        <div className="flex gap-30 justify-between font-mono">
            <div className="text-2xl">CVision</div>
            <div className="flex flex-col">
                <div className="flex gap-5">
                    <a href="">About</a>
                    <Link to="/contact">Contact</Link>
                    <a href="">Support</a>
                </div>
                <div>©2025 CVision. All right reserved.</div>
            </div>
            <div className="flex gap-5 items-center">
                <a href="https://www.linkedin.com/in/estif/"><Linkedin /></a>
                <a href="https://github.com/Kingestif"><Github /></a>
                <a href=""><Twitter /></a>
            </div>
        </div> 
    )
}                                                                                                                                                                                                                                                                       