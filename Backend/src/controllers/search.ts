import axios from "axios";
import { Request, response, Response } from "express";

export const Search = async(req:Request, res:Response) => {
    try{
        const query = req.params.searchQuery;
        const sessionId = req.params.sessionId;

        const response = await axios.post('http://localhost:8000/search', {
            session_id: "42159b5e-b5ea-4c06-8bea-5bdafe18e351",
            query: query
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