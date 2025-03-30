import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import api from "../services/api";
import "../styles/ListaUsuarios.css"

const generateUserColor = (userId) => {
    const colors = [
      '#E57373', '#F06292', '#BA68C8', '#9575CD',
      '#7986CB', '#64B5F6', '#4FC3F7', '#4DD0E1',
      '#4DB6AC', '#81C784', '#AED581', '#DCE775',
      '#FFF176', '#FFD54F', '#FFB74D', '#FF8A65'
    ];
    
    const hash = Array.from(userId.toString())
      .reduce((acc, char, index) => acc + (char.charCodeAt(0) * (index + 1)), 0);
    
    return colors[hash % colors.length];
  };

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get(`/usuarios?page=${page}&limit=10`);
      
      if (res.data.length === 0) {
        setHasMore(false);
        return;
      }

      const newUsers = res.data.filter(newUser => 
        !usuarios.some(existingUser => existingUser.id === newUser.id)
      );

      setUsuarios(prev => [...prev, ...newUsers]);
      setPage(prevPage => prevPage + 1);
      setHasMore(res.data.length >= 10);

    } catch (error) {
      console.error("Erro ao buscar usuários", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();

    return () => {
      setUsuarios([]);
      setPage(1);
      setHasMore(true);
    };
  }, []);

  return (
    <div className="container">
      <div className="app-bar">
        <div className="app-bar-content">
          <h1 className="app-title">Gerenciamento de Usuários</h1>
          <Link to="/cadastro" className="primary-button">
            <span className="material-icons">person_add</span>
            Novo usuário
          </Link>
        </div>
      </div>

      <div className="content">
        <InfiniteScroll
          dataLength={usuarios.length}
          next={fetchUsuarios}
          hasMore={hasMore}
          loader={
            <div className="loading-container">
              <div className="progress-bar"></div>
            </div>
          }
          endMessage={
            <div className="end-message">
              <span className="material-icons">check_circle</span>
              Todos os usuários foram carregados
            </div>
          }
        >
          <div className="user-list">
            {usuarios.map((user) => (
              <div key={user.id} className="user-list-item">
                <Link to={`/usuario/${user.id}`} className="user-link">
                  <div 
                    className="user-avatar"
                    style={{ backgroundColor: generateUserColor(user.id) }}
                  >
                    {user.nome[0].toUpperCase()}
                  </div>
                  <div className="user-info">
                    <h3 className="user-name">{user.nome}</h3>
                    <div className="user-details">
                      <span className="user-id">ID: {user.id}</span>
                      {user.email && <span className="user-email">{user.email}</span>}
                    </div>
                  </div>
                  <span className="material-icons chevron">chevron_right</span>
                </Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default ListaUsuarios;
