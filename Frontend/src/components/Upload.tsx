import { ArrowUpFromLine, Lock } from "lucide-react";
import { useRef } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function Upload() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="h-screen flex flex-col bg-[url('/Wave6.svg')] bg-no-repeat bg-cover bg-right-bottom">
            <NavBar/>
        
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-100 m-auto shadow-[0_0_30px_0.1px_rgba(0,0,0,0.2)] bg-white p-5 rounded-2xl">
                <div className="font-medium text-gray-700">Add Documents</div>
                <hr className="text-gray-200" />
                <label className="text-gray-600">
                    Job Description
                    <br /><textarea name="job_description" placeholder="Write short description about the job" className="border rounded px-2 py-1 w-full border-gray-200 focus:border-gray-400 focus:outline-none" />
                </label>
                <div>
                    <div className="text-gray-600">Upload Resumes</div>
                    <div className="border-dashed border-2 p-4 flex flex-col items-center cursor-pointer border-gray-200 gap-2"
                        onClick={() => fileInputRef.current?.click()}>
                        <ArrowUpFromLine />
                        <div className="text-gray-600 w-40 text-center">Drag and Drop or <span className="text-blue-600">Browse files</span></div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="resumes"
                            accept=".pdf,.docx"
                            multiple
                            className="hidden"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">Accepted File Types: .pdf and .docx only</div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Lock className="w-3" />
                        <div className="text-xs">Secure</div>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
            </form>
        <div className='mt-auto mb-8 text-white mx-40 font-bold'><Footer/></div>
    </div>
    );
}