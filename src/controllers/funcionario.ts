import { Request, Response } from "express";
import { Funcionario, funcionarioModel } from "../models/funcionario";
import { badRequest, internalServerError, notFound, ok, validateNumber, validateNumberNatural } from "../services/util";

const insertFuncionario = (req: Request, res: Response) => {

    {
        const funcionario = req.body.funcionario;
        if(!funcionario)
            return badRequest(res, "Funcionario inválido");

        if(!funcionario.nome)
            return badRequest(res, "Informe o nome do funcionario");

        if(!validateNumber(funcionario.idade))
            return badRequest(res, 'Informe a idade');

        if(!validateNumberNatural(funcionario.salario)){
            return badRequest(res, 'Informe o salario');
        }
        
    }
    const funcionario = req.body.funcionario as Funcionario;
    return funcionarioModel.insertFuncionario(funcionario)
        .then(funcionario =>{
            res.json({funcionario})
        })
        .catch(err => internalServerError(res, err));
}

const listFuncionario = (req: Request, res: Response) => {
    funcionarioModel.listFuncionario()
        .then(funcionario =>{
            res.json(funcionario)
        })
        .catch(err => internalServerError(res, err));
}

const getFuncionario = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res,'Id inválido')
    }

    return funcionarioModel.getFuncionario(id)
        .then(funcionario =>{
            if(funcionario)
                return res.json(funcionario);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));

}

const updateFuncionario = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    {
        if(!validateNumber(id))
            return badRequest(res,'Id inválido')

        const funcionario = req.body;
        if(!funcionario)
            return badRequest(res, "Funcionario inválido");

        if(!funcionario.nome)
            return badRequest(res, "Informe o nome do funcionario");

        if(!validateNumber(funcionario.idade))
            return badRequest(res, 'Informe a idade');

        if(!validateNumberNatural(funcionario.salario)){
            return badRequest(res, 'Informe o salario');
        }

        const funcionarioSaved = await funcionarioModel.getFuncionario(id);
        if(!funcionarioSaved)
            return notFound(res);
    }
    const funcionario = req.body as Funcionario;
    return funcionarioModel.updateFuncionario(funcionario)
        .then(funcionario =>{
            res.json(funcionario)
        })
        .catch(err => internalServerError(res, err));
}

const deleteFuncionario = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res,'Id inválido')

        const funcionarioSaved = await funcionarioModel.getFuncionario(id);
        if(!funcionarioSaved)
            return notFound(res);
    }

    return funcionarioModel.deleteFuncionario(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));

}

export const funcionarioController = {
    insertFuncionario,
    listFuncionario,
    getFuncionario,
    deleteFuncionario,
    updateFuncionario
}