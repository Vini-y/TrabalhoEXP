import { Routes, Route } from "react-router-dom";
import ListaUsuarios from "./pages/ListaUsuarios";
import CadastroUsuario from "./pages/CadastroUsuario";
import DetalhesUsuario from "./pages/DetalhesUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListaUsuarios />} />
      <Route path="/cadastro" element={<CadastroUsuario />} />
      <Route path="/usuario/:id" element={<DetalhesUsuario />} />
      <Route path="/editar/:id" element={<EditarUsuario />} />
    </Routes>
  );
}

export default App;



