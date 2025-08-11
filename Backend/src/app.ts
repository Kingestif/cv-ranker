import express from "express";
import uploadRoute  from "./routes/uploadRoute";
import searchRoute from "./routes/searchRoute";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("combined")); 

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,               
}));

app.use('/api/v1/upload', uploadRoute);
app.use('/api/v1/search', searchRoute);

app.get('/', (req, res) => {
  res.send('Server is running!')
});

export default app;