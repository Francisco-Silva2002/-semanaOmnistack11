const crypt = require("crypto")
const connection = require("../database/connection")

module.exports = {
    async index(request, response) {
        const ongs = await connection("ongs").select("*")
    
        return response.json(ongs);
    },

    async create(request, response) {
        const data = request.body
        const id = crypt.randomBytes(4).toString("HEX")

        await connection("ongs").insert({
            id,
            name: data.name,
            email: data.email,
            whatsapp: data.whatsapp,
            city: data.city,
            uf: data.uf,
        })
        return response.json({ id })
    }
}