import { ArrowUpFromLine, Lock } from "lucide-react";
import { useRef } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { useState } from "react";

type UploadedFilesProps = {
  files: File[];
};

export function UploadedFiles({ files }: UploadedFilesProps) {
  return (
    <div className="my-30 bg-blue-600 rounded-xl shadow p-4 h-170 w-300 ">
      <div className="text-lg font-semibold mb-2">Your Uploaded Files</div>
      <ul className="text-sm text-gray-600 w-full">
        {files.slice(0, 3).map((file, idx) => (
          <li key={idx} className="truncate w-full" title={file.name}>{file.name}</li>
        ))}
        {files.length > 3 && (
          <li className="text-xs text-gray-400">...and {files.length - 3} more</li>
        )}
      </ul>
    </div>
  );
}

export function Upload() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadedFilesRef = useRef<HTMLDivElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [showUploadedFiles, setShowUploadedFiles] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        setShowUploadedFiles(true); // show files on submit
        e.preventDefault();
        setTimeout(() => {
            if (uploadedFilesRef.current) {
                uploadedFilesRef.current.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }, 100); 
    };

    return (
        <div className="h-screen flex flex-col">
            <NavBar />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 w-[40rem] max-w-full m-auto shadow-[0_0_30px_0.1px_rgba(0,0,0,0.2)] bg-white p-8 rounded-2xl"
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

                {selectedFiles.length > 0 && (
                    <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition" disabled={selectedFiles.length === 0}>
                        Rank Resumes
                    </button>
                )}

            </form>
            
            {showUploadedFiles && selectedFiles.length > 0 && (
                <div ref={uploadedFilesRef} className="flex justify-center mt-10">
                    <UploadedFiles files={selectedFiles} />
                </div>
            )}

            <div className="mt-auto mb-8 text-white mx-40 font-bold">
                <Footer />
            </div>
        </div>
);

}