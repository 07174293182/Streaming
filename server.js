import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Olá Mundo'
})

server.post('/series', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {Nome, Diretor, Duração, Gêneros, Classificação } = request.body
    database.create({
        Nome: Nome,
        Dirteor: Diretor,
        Duração: Duração,
        Gêneros: Gêneros,
        Classificação: Classificação
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/series', (request) => {
    const search = request.query.search

    console.log(search)

    const series = database.list(search)

    return series
})

server.put('/serie/:id', (request, reply) => {

    const serieId = request.params.id
    const{Nome, Diretor, Duração, Gêneros, Classificação} = request.body
    const serie = database.update(serieId, {
        Nome,
        Diretor,
        Duração,
        Gêneros,
        Classificação
    })
    return reply.status(204).send()
})

server.delete('/serie/:id', (request, reply) => {
    const serieId = request.params.id

    database.delete(serieId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})