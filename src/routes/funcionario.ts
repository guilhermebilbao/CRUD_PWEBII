import { Router } from "express";
import { funcionarioController } from "../controllers/funcionario";

const funcionarioRouter = Router();
funcionarioRouter.post('/', funcionarioController.insertFuncionario);
funcionarioRouter.get('/', funcionarioController.listFuncionario);
funcionarioRouter.get('/:id', funcionarioController.getFuncionario);
funcionarioRouter.delete('/:id', funcionarioController.deleteFuncionario);
funcionarioRouter.put('/:id', funcionarioController.updateFuncionario);


export{
    funcionarioRouter
}