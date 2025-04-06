import helmet from "helmet";
import cors from "cors";
import express, { Request, Response, Application, NextFunction } from 'express';
import apiLog from "./utils/helpers/apiLog";

const app: Application = express();

// Use Middle-wares
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json());
// app.use(helmet());
// app.use(cors());

// API's logger
app.use(apiLog)

// Use Routes
import routes from "./routes";
app.use('/api',routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Internal Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app