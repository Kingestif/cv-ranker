import { Request, response, Response } from "express";
import axios from "axios";
import FormData from "form-data";
import fs from 'fs';

export const Rank = async(req:Request, res:Response) => {
    try{
        const resumes = req.files as Express.Multer.File[];
        const job_description = req.body.job_description;
        if (!resumes || resumes.length === 0) {
            return res.status(400).json({ status: "fail", message: "No file uploaded" });
        }

        const form = new FormData();

        resumes.forEach(file => {
            form.append('resumes', file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype,
            });
        });

        form.append('job_description', job_description);

        const response = await axios.post('http://localhost:8000/upload', form, {
            headers:form.getHeaders(),
        });
        
        res.status(200).json({
            status: "success",
            data: response.data
        });

    }catch(error){
        res.status(500).json({
            status: "server error",
            message: error instanceof Error ? error.message : String(error)
        });
    }
}