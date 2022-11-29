import { Application, Router } from "express";
import { productRouter } from "./products";
import { funcionarioRouter } from "./funcionario";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/funcionario', funcionarioRouter);
    apiRouter.use('/products', productRouter);
    

    app.use('/api/v1', apiRouter);
}