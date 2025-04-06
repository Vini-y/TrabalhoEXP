import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/DetalhesUsuario.css";

// Função para gerar cores
const generateUserColor = (userId) => {
  const colors = [
    "#E57373", "#F06292", "#BA68C8", "#9575CD",
    "#7986CB", "#64B5F6", "#4FC3F7", "#4DD0E1",
    "#4DB6AC", "#81C784", "#AED581", "#DCE775",
    "#FFF176", "#FFD54F", "#FFB74D", "#FF8A65"
  ];

  const hash = Array.from(userId.toString())
    .reduce((acc, char, index) => acc + (char.charCodeAt(0) * (index + 1)), 0);

  return colors[hash % colors.length];
};

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

  if (!usuario) return <div className="loading-container">Carregando...</div>;

  return (
    <div className="container">
      <header className="app-bar">
          <h1 className="app-title">Detalhes do Usuário</h1>
          <button 
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
      </header>

      <div className="user-details-container">
        <div className="user-profile-card">
          <div 
            className="user-avatar large"
            style={{ backgroundColor: generateUserColor(usuario.id) }}
          >
            {usuario.nome[0].toUpperCase()}
          </div>
          <h2 className="user-name">{usuario.nome}</h2>
          
          <div className="details-grid">
            <DetailItem label="Ano de Nascimento" value={usuario.anoNascimento} />
            <DetailItem label="Endereço" value={usuario.endereco} />
            <DetailItem label="Gênero" value={usuario.genero} />
            <DetailItem label="CPF" value={usuario.cpf} />
            <DetailItem label="Email" value={usuario.email} />
          </div>

          <div className="card-actions">
            <button 
              className="primary-button"
              onClick={() => navigate(`/editar/${id}`)}
            >
              Editar
            </button>
            <button 
              className="danger-button"
              onClick={handleDelete}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const DetailItem = ({ label, value }) => (
  <div className="detail-item">
    <span className="detail-label">{label}:</span>
    <span className="detail-value">{value}</span>
  </div>
);

export default DetalhesUsuario;
