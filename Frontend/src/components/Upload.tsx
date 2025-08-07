import { ArrowUpFromLine, Lock } from "lucide-react";
import { useRef } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { useState } from "react";
import type { RankedResults, RankedResume } from "../Types";

type UploadedFilesProps = {
    rankedResults: RankedResults | null;
    searchResults?: RankedResume[] | null;
    handleSearch: () => Promise<void>;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchQuery: string;
    loading: boolean;
};

export function UploadedFiles({ rankedResults, searchResults, handleSearch, setSearchQuery, searchQuery, loading }: UploadedFilesProps) {
    const resumesToShow = searchResults && searchResults.length > 0 ? searchResults : rankedResults?.ranked_resumes || [];      //if user searched rank based on search, otherwise default ranked resumes

    return (
        <div className="font-mono flex gap-5 flex-col my-30  rounded-xl  p-4 h-170 w-300 shadow-[0_0_30px_0.1px_rgba(0,0,0,0.2)]">
            <div className="text-2xl font-mono text-blue-600 font-bold">Top Applicants for this role</div>
            <div className="flex">
                {
                    loading? (
                    // Pulse placeholder until results are fetched
                        <div className="w-400 h-150 overflow-y-auto">
                            <ol className="flex flex-col gap-10 list-decimal ml-10">
                                {[...Array(5)].map((_, idx) => (
                                    <li key={idx} className="mb-2">
                                    <div className="h-5 bg-gray-300 rounded w-3/5 mb-1 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-1 animate-pulse"></div>
                                    <div className="h-15 bg-gray-200 rounded w-full animate-pulse"></div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                    ): (
                        <div>
                            <div className="w-200 h-150 overflow-y-auto">
                                <ol className="list-decimal ml-10">
                                    {resumesToShow && (
                                        resumesToShow.map((result, idx) => (
                                            <li key={idx} className="mb-5">
                                                <div className="font-bold">{result.applicant_name}</div>
                                                <div className="text-gray-500">{result.filename}</div>
                                                <div className="">{result.text_preview}</div>
                                            </li>
                                        ))   
                                    )}
                                </ol>
                            </div>
                        </div>

                    )
                }
                <div className="h-150 border-l border-gray-300 border-1 mx-6"></div>
                <div className="w-full flex flex-col gap-5 justify-between">
                    <div className="flex flex-col gap-5">
                        <input 
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                            type="text" 
                            placeholder="Search for specific skill" 
                            className="text-md border-1 rounded-md p-2 border-gray-400 focus:outline:none focus:border-gray-700 focus:outline-none"
                        />
                        
                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed"
                            onClick={handleSearch}
                            disabled={searchQuery.trim() === ""}
                            >
                            Search
                        </button>
                    </div>
                    <a href="" className="bg-blue-100 text-center text-blue-600 font-semibold px-2 py-3 rounded-2xl hover:bg-blue-200 transition">Hire Professionals?</a>
                </div>
            </div>
        </div>
    );
}

export function Upload() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadedFilesRef = useRef<HTMLDivElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [showUploadedFiles, setShowUploadedFiles] = useState(false);
    const [jobDescription, setJobDescription] = useState("");
    const [rankedResults, setRankedResults] = useState<RankedResults | null>(null);
    const [searchResults, setSearchResults] = useState<RankedResume[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!jobDescription.trim()) {
            alert("Job description is required.");
            return;
        }
        if (selectedFiles.length === 0) {
            alert("Please upload at least one resume.");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });
        formData.append('job_description', jobDescription);

        setShowUploadedFiles(true); // show files on submit
        setTimeout(() => {
            if (uploadedFilesRef.current) {
                uploadedFilesRef.current.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }, 100); 

        try{
            const response = await fetch('http://localhost:3000/api/v1/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log("HERE IS DATA", data);
            setRankedResults(data.data);
        }catch(error){
            alert("Failed to rank resumes");
        }finally{
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            // If query is empty, shows full list instead
            setSearchResults([]);
            return;
        }


        try {
            if (!rankedResults?.session_id) {
                alert("Please rank resumes first.");
                return;
            }

            const response = await fetch(`http://localhost:3000/api/v1/search/${encodeURIComponent(searchQuery)}`, {
                method: "GET",
                headers: {
                    "x-session-id": rankedResults.session_id
                }
            });


            const data = await response.json();
            console.log("Search response:", data.data);
            setSearchResults(data.data.top_matches || []);
        } catch (error) {
            alert("Search failed.");
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(error);
            }
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <NavBar />

            <form
                onSubmit={handleSubmit}
                className="font-mono flex flex-col gap-6 w-[40rem] max-w-full m-auto shadow-[0_0_30px_0.1px_rgba(0,0,0,0.2)] bg-white p-8 rounded-2xl"
            >
                <div className="font-semibold text-3xl text-gray-800">Upload Documents</div>
                <hr className="text-gray-200" />

                <label className="text-gray-600 text-base">
                    Job Description
                    <br />
                    <textarea
                        name="job_description"
                        placeholder="Provide a brief description of the job or role"
                        className="border rounded px-3 py-2 w-full border-gray-300 focus:border-gray-500 focus:outline-none text-sm"
                        rows={4}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </label>

                <div>
                    <div className="text-gray-600 text-base mb-2">Upload Resumes</div>
                    <div
                        className="border-dashed border-2 p-6 flex flex-col items-center cursor-pointer border-gray-300 gap-2 rounded-md hover:bg-gray-50 transition"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ArrowUpFromLine className="w-6 h-6 text-gray-500" />
                        <div className="text-gray-600 text-sm w-52 text-center p-7">
                            Drag and Drop or <span className="text-blue-600 font-medium">Browse files</span>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="resumes"
                            accept=".pdf,.docx"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setSelectedFiles(Array.from(e.target.files));
                                    setShowUploadedFiles(false); // reset visibility on new upload
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <div className="text-xs text-gray-400">Only .pdf and .docx files are accepted</div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <Lock className="w-4 h-4" />
                        <div className="text-xs">Secure</div>
                    </div>
                </div>

                {selectedFiles.length > 0 && (
                    <div className="mt-4">
                        <div className="text-sm text-gray-800">Uploaded Files</div>
                        <ul className="text-sm text-gray-600 mt-2 w-full">
                            {selectedFiles.slice(0, 3).map((file, idx) => (
                                <li key={idx} className="truncate w-full" title={file.name}>{file.name}</li>
                            ))}
                            {selectedFiles.length > 3 && (
                                <li className="text-xs text-gray-400">...and {selectedFiles.length - 3} more</li>
                            )}
                        </ul>
                    </div>
                )}

                {selectedFiles.length > 0 && jobDescription.trim() !== "" && (
                    <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition" disabled={selectedFiles.length === 0 || !jobDescription.trim()}>
                        Rank Resumes
                    </button>
                )}

            </form>
            
            {showUploadedFiles && selectedFiles.length > 0 && (
                <div ref={uploadedFilesRef} className="flex justify-center mt-10">
                    <UploadedFiles 
                        rankedResults={rankedResults} 
                        searchResults={searchResults}
                        handleSearch={handleSearch}
                        setSearchQuery={setSearchQuery}
                        searchQuery={searchQuery}
                        loading={loading}
                    />
                </div>
            )}

            <div className=" mt-auto mb-8 mx-40 font-semibold text-sm bg-blue-600 px-5 py-5 rounded-2xl text-white ">
                <Footer />
            </div>
        </div>
);

}