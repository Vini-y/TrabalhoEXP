import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/EditarUsuario.css";

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    anoNascimento: "",
    endereco: "",
    genero: "Masculino",
    cpf: "",
    email: "",
  });

  useEffect(() => {
    api.get(`/usuarios/${id}`)
      .then((res) => setForm(res.data))
      .catch((error) => console.error("Erro ao buscar usuário", error));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/usuarios/${id}`, form);
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar usuário", error);
    }
  };

  return (
    <div className="container">
      <header className="app-bar">
          <h1 className="app-title">Editar Usuário</h1>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
      </header>

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
            <button type="submit" className="btn-primary">
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarUsuario;
