const express = require("express")
const router = express.Router()
const { check } = require('express-validator')
var myController = require("../controllers/mycontroller")



router.get("/", myController.pagLogin)
router.post("/", myController.auth)

router.get("/cadastro", myController.pagCadastro)
router.post("/cadastro", myController.novoUser)

router.get("/filtro", myController.pagFiltro)
// router.post("/filtro", myController.filtro)

router.get("/users", myController.pagUsers)
router.get("/deletarUser/:idUser", myController.deletarUser)

router.get("/deletarLivro/:idLivro",myController.deletarLivro)
// router.get("/devolveLivro/:idLivro",myController.devolveLivro)
router.get("/pegaEmp/:idLivro",myController.pegaEmp)

router.get("/logout", myController.logout)

router.get("/add", myController.pagAdd)
router.post("/add", myController.addLivro)

router.get("/meusLivros:idLivro", myController.pagMeusLivros)

router.get("/modLivro/:idLivro", myController.pagModLivro)
router.post("/modLivro/:idLivro", myController.modLivro)

router.get("/modUser/:idUser", myController.pagModUser)
router.post("/modUser/:idUser", myController.modUser)

module.exports = router 