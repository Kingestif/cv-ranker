import { Request, Response } from "express";

export const Rank = async(req:Request, res:Response) => {
    try{
        const Resumes = req.files;
        const JobDescription = req.body.JobDescription;

        console.log(JobDescription);
        console.log(Resumes);
        
        res.status(200).json({
            status: "success"
        });

    }catch(error){
        res.status(500).json({
            status: "server error",
            message: error instanceof Error ? error.message : String(error)
        });
    }
}