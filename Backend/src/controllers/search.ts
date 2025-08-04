import { Request, response, Response } from "express";

export const Search = async(req:Request, res:Response) => {
    try{
        const query = req.params.searchQuery;
        const sessionId = req.params.sessionId;
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