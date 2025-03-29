import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import api from "../services/api";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get(`/usuarios?page=${page}&limit=10`);
      setUsuarios([...usuarios, ...res.data]);
      setHasMore(res.data.length > 0);
      setPage(page + 1);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      <Link to="/cadastro">Cadastrar Usuário</Link>
      <InfiniteScroll
        dataLength={usuarios.length}
        next={fetchUsuarios}
        hasMore={hasMore}
        loader={<h4>Carregando...</h4>}
      >
        <ul>
          {usuarios.map((user) => (
            <li key={user.id}>
              <Link to={`/usuario/${user.id}`}>{user.nome}</Link>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default ListaUsuarios;
