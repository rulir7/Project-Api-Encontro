import express from "express"
import type { Request, Response } from "express"
import { body, validationResult } from "express-validator"   // serve para uma camada de segurança para validar as requisições .... uso opcional

import * as AnswerService from "./answer.service"
import { request } from "http"

export const AnswerRouter = express.Router()


// para criar uma rota sem variável
AnswerRouter.get("/", async (request: Request, response: Response) => {
    try {

        const answer = await AnswerService.getAnswer();
        return response.status(200).json(answer)

    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// para criar uma rota com variável (no caso id)-> o nome apoós os : é o nome da variável
AnswerRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id)                       //precisa do parseint para passar o valor de STRING do ID para INTEIRO
    try {
        const answer = await AnswerService.getAnswerById(id)
        if (answer)
            return response.status(200).json(answer)
        else
            return response.status(404).json("Resposta não encontrada")
    }
    catch (erro: any) {
        return response.status(500).json(erro.message)
    }
})

// rota para criar uma nova resposta
AnswerRouter.post('/', body("answer").isString(),
    async (request: Request, response: Response) => {
        try {
            const answer = request.body
            const newAnswer = await AnswerService.createAnswer(answer)
            return response.status(201).json(newAnswer)
        }
        catch (erro: any) {
            return response.status(500).json(erro.message)

        }

    })

// rota para atualizar uma  resposta
AnswerRouter.put('/:id', body("answer").isString(),
    async (request: Request, response: Response) => {
        try {
            const answer = request.body
            const id = parseInt(request.params.id)   // ID vem da ROTA
            const updateAnswer = await AnswerService.updateAnswer(answer, id)
            return response.status(201).json(updateAnswer)
        }
        catch (erro: any) {
            return response.status(500).json(erro.message)
        }
    })

// rota para deletar uma  resposta
AnswerRouter.delete("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id)                       //precisa do parseint para passar o valor de STRING do ID para INTEIRO
    try {
        const answer = await AnswerService.deleteAnswerById(id)
        if (answer)
            return response.status(200).json(`REsposta deletada com sucesso!`)
        else
            return response.status(404).json("Resposta não encontrado")
    }
    catch (erro: any) {
        return response.status(500).json(erro.message)
    }
})