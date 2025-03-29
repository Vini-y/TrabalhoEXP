const express = require("express");
const router = express.Router();
const db = require("../db");

// **1. Listar todos os usuários**
router.get("/", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// **2. Buscar usuário por ID**
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(result[0]);
  });
});

// **3. Criar um novo usuário**
router.post("/", (req, res) => {
  const { nome, anoNascimento, endereco, genero, cpf, email } = req.body;

  if (!nome || !anoNascimento || !endereco || !genero || !cpf || !email) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  db.query(
    "INSERT INTO usuarios (nome, anoNascimento, endereco, genero, cpf, email) VALUES (?, ?, ?, ?, ?, ?)",
    [nome, anoNascimento, endereco, genero, cpf, email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, nome, anoNascimento, endereco, genero, cpf, email });
    }
  );
});

// **4. Atualizar usuário**
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, anoNascimento, endereco, genero, cpf, email } = req.body;

  db.query(
    "UPDATE usuarios SET nome = ?, anoNascimento = ?, endereco = ?, genero = ?, cpf = ?, email = ? WHERE id = ?",
    [nome, anoNascimento, endereco, genero, cpf, email, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Usuário atualizado com sucesso" });
    }
  );
});

// **5. Deletar usuário**
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Usuário deletado com sucesso" });
  });
});

module.exports = router;
