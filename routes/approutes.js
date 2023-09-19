const express = require("express")
const router = express.Router()
const { check } = require('express-validator')
var myController = require("../controllers/mycontroller")



router.get("/", myController.pagResultado)
router.post("/filtro", myController.filtro)

router.get("/deletarEmpregado/:id",myController.deletarEmpregado)
router.get("/editarEmpregado/:id",myController.formEditar)
router.post("/editarEmpregado/:id",myController.editarEmpregado)
router.get("/add", myController.formAdd)
router.post("/add", myController.addEmpregado)

module.exports = router 