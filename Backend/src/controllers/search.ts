import axios from "axios";
import { Request, response, Response } from "express";

export const Search = async(req:Request, res:Response) => {
    try{
        const query = req.params.searchQuery;
        const sessionId = req.params.sessionId;

        const response = await axios.post('http://localhost:8000/search', {
            session_id: "fea5e5da-65b7-4ce9-aba7-e9750eca3840",
            query: query
        });

        res.status(200).json({
            status: "success",
            data: response.data
        });

    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;
            const message = error.response.data.detail || 'Something went wrong';

            res.status(status).json({
                status: "fail",
                message
            });
        } else {
            res.status(500).json({
                status: "error",
                message: error instanceof Error ? error.message : String(error)
            });
        }
    }
}