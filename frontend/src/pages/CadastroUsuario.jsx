import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/CadastroUsuario.css";

function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: "",
    anoNascimento: "",
    endereco: "",
    genero: "",
    cpf: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios", form);
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar usuário", error);
    }
  };

  return (
    <div className="container">
      <div className="app-bar">
        <div className="app-bar-content">
          <h1 className="app-title">Cadastrar Novo Usuário</h1>
          <button 
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-grid">
            <div className="form-group">
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome completo"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                name="anoNascimento"
                value={form.anoNascimento}
                onChange={handleChange}
                placeholder="Ano de nascimento"
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
                placeholder="Endereço completo"
                required
              />
            </div>

            <div className="form-group">
              <select name="genero" value={form.genero} onChange={handleChange}>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                placeholder="CPF (000.000.000-00)"
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail válido"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              Cadastrar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroUsuario;