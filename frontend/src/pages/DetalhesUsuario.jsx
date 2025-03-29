import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function DetalhesUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/usuarios/${id}`).then((res) => setUsuario(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      await api.delete(`/usuarios/${id}`);
      navigate("/");
    }
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{usuario.nome}</h1>
      <p><strong>Ano de Nascimento:</strong> {usuario.anoNascimento}</p>
      <p><strong>Endereço:</strong> {usuario.endereco}</p>
      <p><strong>Gênero:</strong> {usuario.genero}</p>
      <p><strong>CPF:</strong> {usuario.cpf}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <button onClick={() => navigate(`/editar/${id}`)}>Editar</button>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  );
}

export default DetalhesUsuario;
