const express = require("express")
const router = express.Router()
const { check } = require('express-validator')
var myController = require("../controllers/mycontroller")



router.get("/", myController.pagLogin)
router.post("/", myController.validator)

// router.get("/cadastro", myController.pagCadastro)
// router.post("/cadastro", myController.novoUser)

// router.get("/filtro", myController.pagFiltro)
// router.post("/filtro", myController.filtro)

// router.get("/deletarLivro/:idLivro",myController.deletarLivro)

// router.get("/add", myController.pagAdd)
// router.post("/add", myController.addLivro)

//router.get("/meusLivros", myController.pagUser)


module.exports = router 