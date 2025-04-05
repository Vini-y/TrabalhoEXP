import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/ListaUsuarios.css";

const colors = [
  "#E57373", "#F06292", "#BA68C8", "#9575CD",
  "#7986CB", "#64B5F6", "#4FC3F7", "#4DD0E1",
  "#4DB6AC", "#81C784", "#AED581", "#DCE775",
  "#FFF176", "#FFD54F", "#FFB74D", "#FF8A65"
];

const generateUserColor = (id) => {
  const hash = Array.from(String(id))
    .reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 0);
  return colors[hash % colors.length];
};

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  // Busca todos os usuários
  const fetchUsuarios = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
      setUsuarios([]);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="container">
      <header className="app-bar">
        <h1>Gerenciamento de Usuários - Vinícius Y. Borges</h1>
        <Link to="/cadastro" className="primary-button">
          Novo usuário
        </Link>
      </header>

      <div className="content">
        <div className="user-list">
          {usuarios.map((user) => (
            <Link key={user.id} to={`/usuario/${user.id}`} className="user-link">
              <div 
                className="user-avatar"
                style={{ backgroundColor: generateUserColor(user.id) }}
              >
                {user.nome.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <h3 className="user-name">{user.nome}</h3>
                <p className="user-id">ID: {user.id}</p>
                {user.email && <p className="user-email">{user.email}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListaUsuarios;
