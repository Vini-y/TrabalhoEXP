import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: "",
    anoNascimento: "",
    endereco: "",
    genero: "Masculino",
    cpf: "",
    email: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/usuarios/${id}`).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/usuarios/${id}`, form);
      } else {
        await api.post("/usuarios", form);
      }
      navigate("/");
    } catch (error) {
      console.error("Erro ao salvar usuário", error);
    }
  };

  return (
    <div>
      <h1>{id ? "Editar Usuário" : "Cadastrar Usuário"}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
        <input type="number" name="anoNascimento" value={form.anoNascimento} onChange={handleChange} placeholder="Ano de Nascimento" required />
        <input type="text" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Endereço" required />
        <select name="genero" value={form.genero} onChange={handleChange}>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
        <input type="text" name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="E-mail" required />
        <button type="submit">{id ? "Atualizar" : "Cadastrar"}</button>
      </form>
    </div>
  );
}

export default CadastroUsuario;
