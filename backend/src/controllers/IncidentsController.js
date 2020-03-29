const connection = require("../database/connection")

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query

        const [count] = await connection("incidents").count()

        console.log(count)

        const data = await connection("incidents")
            .join("ongs", "ongs.id", "=", "incidents.ong_id") //relacionamento de dados
            .limit(5)
            .offset((page -1)*5) //paginação (retorna de 5 em 5 casos)
            .select([
                "incidents.*",
                "ongs.name",
                "ongs.email",
                "ongs.whatsapp",
                "ongs.city",
                "ongs.uf"
            ]) //seleciona todos os registros

        response.header("X-Total-Count", count['count(*)'])
        return response.json(data);
    },

    async create(request, response) {
        const { title, description, value} = request.body
        const ong_id = request.headers.authorization

        const [id] = await connection("incidents").insert({
            title,
            description,
            value,
            ong_id
        }) // insere um novo registro no banco

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection("incidents")
            .where("id", id)
            .select("ong_id")
            .first()

        if(incident.ong_id !== ong_id) {
            return response.status(401).json({ error: "Operator not permited" })
        }

        await connection("incidents")
            .where("id", id)
            .delete()
        // deleta um registro do banco

        return response.status(204).send()
    }
}
