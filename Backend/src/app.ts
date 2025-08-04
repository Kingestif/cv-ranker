import express from "express";
import uploadRoute  from "./routes/uploadRoute";
import searchRoute from "./routes/searchRoute";
const app = express();

app.use(express.json());
app.use('/api/v1/upload', uploadRoute);
app.use('/api/v1/search', searchRoute);

app.get('/', (req, res) => {
  res.send('Server is running!')
});

export default app;