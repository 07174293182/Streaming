import { randomUUID } from "crypto"


export class DatabaseMemory{
    #series = new Map()

list(search){
    return Array. from(this.#series.entries()).map((serieArray) => {
        const id = serieArray[0]

        const data = serieArray[1]

        return{
            id,
            ...data,
        }
    })

    .filter(serie => {
        if (search) {
            return serie.Nome.includes(search)
        }
        return true
    })
    
}

    create(serie){
        const serieId = randomUUID()
        this.#series.set(serieId, serie)
    }
    
    update(id, serie){
        this.#series.set(id, serie)
    }

    delete(id, serie){
        this.#series.delete(id, serie)
    }
}