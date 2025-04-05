import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/CadastroUsuario.css";

function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: "",
    anoNascimento: "",
    endereco: "",
    genero: "Masculino",
    cpf: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios", form);
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div className="container">
      <header className="app-bar">
          <h1 className="app-title">Cadastrar Novo Usuário</h1>
          <button className="secondary-button" onClick={() => navigate("/")}>
            Voltar
          </button>
      </header>

      <main className="form-container">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-grid">
            {[
              { name: "nome", type: "text", placeholder: "Nome completo" },
              { name: "anoNascimento", type: "number", placeholder: "Ano de nascimento", min: 1900, max: new Date().getFullYear() },
              { name: "endereco", type: "text", placeholder: "Endereço completo" },
              { name: "cpf", type: "text", placeholder: "CPF (000.000.000-00)", pattern: "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" },
              { name: "email", type: "email", placeholder: "E-mail válido" },
            ].map(({ name, ...rest }) => (
              <input
                key={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                {...rest}
              />
            ))}

            <select name="genero" value={form.genero} onChange={handleChange}>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              Cadastrar Usuário
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CadastroUsuario;
