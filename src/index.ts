import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();

import express, { Request, Response } from 'express';
import { useRoutes } from './routes';
const PORT = process.env.PORT || 4000;
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
const app = express();
app.use(bodyParser.json());
useRoutes(app);

app.get('/', (req: Request, res: Response) => {
    res.json({
        msg: 'ok'
    })
})

// Cors
app.use(cors({
    origin: ['http://localhost:4000']
}))

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso`)
})