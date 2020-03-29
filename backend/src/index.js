const express = require("express") // importando o módulo express
const routes = require("./routes")
const cors = require("cors")

const app = express() // inicializando a aplicação

app.use(cors())
app.use(express.json()) // permite trabalhar com JSON
app.use(routes);

app.listen(3333) // ouve a porta 3333
