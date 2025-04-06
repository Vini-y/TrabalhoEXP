const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// Rota para listar todos os usuários
router.get("/", userController.getUsers);

// Rota para buscar um usuário pelo ID
router.get("/:id", userController.getUserById);

// Rota para criar um novo usuário
router.post("/", userController.addUser);

// Rota para atualizar um usuário existente
router.put("/:id", userController.updateUser);

// Rota para deletar um usuário
router.delete("/:id", userController.deleteUser);

module.exports = router;
