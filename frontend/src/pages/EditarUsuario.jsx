import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

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
    <div>
      <h1>Editar Usuário</h1>
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
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}

export default EditarUsuario;
