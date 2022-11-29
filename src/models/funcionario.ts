import { dbQuery, dbQueryFirst } from "../services/db"

export type Funcionario = {
    id: number;
    nome: string;
    cpf: string;
    idade: number;
    funcao: string;
    endereco: string;
    salario: number;
}

const insertFuncionario = async (funcionario: Funcionario) => { // informa se vai passar algum parametro
    await dbQuery('INSERT INTO funcionario (nome, cpf, idade, funcao, endereco, salario) VALUES(?,?,?,?,?,?)', 
    [funcionario.nome, funcionario.cpf,funcionario.idade,funcionario.funcao, funcionario.endereco, funcionario.salario ])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'funcionario'`);
    return getFuncionario(retorno[0].Id);
}

const listFuncionario = async () => {
    const retorno = await dbQuery('SELECT * from funcionario');
    return retorno as Funcionario[];
}

const getFuncionario = async (id: number) => {
    const retorno = await dbQueryFirst('SELECT * FROM funcionario WHERE id = ?', [id]);
    return retorno as Funcionario | undefined;
}

const updateFuncionario = async (funcionario: Funcionario) => { // informa se vai passar algum parametro
    await dbQuery('UPDATE funcionario SET nome = ?, cpf = ?, idade = ?, funcao = ?, endereco = ?, salario = ?  WHERE id = ?',
     [funcionario.nome, funcionario.cpf,funcionario.idade,funcionario.funcao, funcionario.endereco, funcionario.salario , funcionario.id])
    return getFuncionario(funcionario.id);
}

const deleteFuncionario = async (id: number) => {
    await dbQueryFirst('DELETE FROM funcionario WHERE id = ?', [id]);
}
export const funcionarioModel = {
    insertFuncionario,
    listFuncionario,
    getFuncionario,
    deleteFuncionario,
    updateFuncionario
}
