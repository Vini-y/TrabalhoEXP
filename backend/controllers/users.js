import { db } from "../db.js";

const executeQuery = (query, params, res, successMessage) => {
  db.query(query, params, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: successMessage, data });
  });
};

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";
  executeQuery(q, [], res, "Usuários carregados com sucesso");
};

export const addUser = (req, res) => {
  const q = "INSERT INTO usuarios (`name`, `email`, `phone`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.phone];
  executeQuery(q, [values], res, "Usuário criado com sucesso");
};

export const updateUser = (req, res) => {
  const q = "UPDATE usuarios SET `name` = ?, `email` = ?, `phone` = ? WHERE `id` = ?";
  const values = [req.body.name, req.body.email, req.body.phone, req.params.id];
  executeQuery(q, values, res, "Usuário atualizado com sucesso");
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";
  executeQuery(q, [req.params.id], res, "Usuário deletado com sucesso");
};