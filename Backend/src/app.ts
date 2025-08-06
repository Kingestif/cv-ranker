import express from "express";
import uploadRoute  from "./routes/uploadRoute";
import searchRoute from "./routes/searchRoute";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));

app.use('/api/v1/upload', uploadRoute);
app.use('/api/v1/search', searchRoute);

app.get('/', (req, res) => {
  res.send('Server is running!')
});

export default app;