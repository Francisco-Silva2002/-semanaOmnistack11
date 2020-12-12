const express = require("express")
const OngController = require("./controllers/OngController")
const IncidentsController = require("./controllers/IncidentsController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")
const routes = express.Router()

routes.post("/session", SessionController.login)
routes.get("/profile", ProfileController.index)

routes.post("/ongs", OngController.create)
routes.get("/ongs", OngController.index)

routes.post("/incidents", IncidentsController.create)
routes.get("/incidents", IncidentsController.index)
routes.delete("/incidents/:id", IncidentsController.delete)

module.exports = routes;