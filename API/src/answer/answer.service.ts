//Service são o agrupamento dos comandos que seriam utilizado pelo PRISMA para acessar o banco de dados.....

import { type } from "os";
import { db } from "../utils/db.server";

export type Answer = {
    id: number;
    selectedDate: string;
    selectedTime: string;

}

// servico para pegar as respostas.               ....
export const getAnswer = async (): Promise<Answer[]> => {
    return await db.answer.findMany({
        select: {
            id: true,
            selectedDate: true,
            selectedTime: true,
        }

    })
}


//servico para pegar a resposta pelo ID
export const getAnswerById = async (id: number): Promise<Answer | null> => {
    return db.answer.findUnique({
        where: {
            id: id
        }, select: {
            id: true,
            selectedDate: true,
            selectedTime: true,
        }
    })
}

// servico para criar uma nova resposta
export const createAnswer = async (answer: Omit<Answer, "id">): Promise<Answer> => {
    return db.answer.create({
        data: answer,
        select: {
            id: true,
            selectedDate: true,
            selectedTime: true,
        }
    })
}

// servico para atualizar uma  resposta
export const updateAnswer = async (answer: Omit<Answer, "id">, id: number): Promise<Answer> => {
    return db.answer.update({
        where: {
            id: id
        },
        data: answer,
        select: {
            id: true,
            selectedDate: true,
            selectedTime: true,
        }
    })
}

// servico para deletar uma  resposta
export const deleteAnswerById = async (id: number): Promise<Answer | null> => {
    return db.answer.delete({
        where: {
            id: id
        }
    })
}