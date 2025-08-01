import express from "express";
import { router } from "./routes/appRoute";
const app = express();

app.use(express.json());
app.use('/api/v1/rank', router);

app.get('/', (req, res) => {
  res.send('Server is running!')
});

export default app;