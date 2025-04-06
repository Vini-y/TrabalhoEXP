const db = require("../db");

// Retorna todos os usuários
exports.getUsers = (req, res) => {
  const query = "SELECT * FROM usuarios";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
};

// Retorna um usuário por ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM usuarios WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
    return res.json(results[0]);
  });
};

// Cria um novo usuário
exports.addUser = (req, res) => {
  const { nome, anoNascimento, endereco, genero, cpf, email } = req.body;
  
  if (!nome || !anoNascimento || !endereco || !genero || !cpf || !email) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const query = "INSERT INTO usuarios (nome, anoNascimento, endereco, genero, cpf, email) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [nome, anoNascimento, endereco, genero, cpf, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, nome, anoNascimento, endereco, genero, cpf, email });
  });
};

// Atualiza um usuário existente
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { nome, anoNascimento, endereco, genero, cpf, email } = req.body;
  const query = "UPDATE usuarios SET nome = ?, anoNascimento = ?, endereco = ?, genero = ?, cpf = ?, email = ? WHERE id = ?";

  db.query(query, [nome, anoNascimento, endereco, genero, cpf, email, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Usuário atualizado com sucesso" });
  });
};

// Deleta um usuário
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM usuarios WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Usuário deletado com sucesso" });
  });
};
