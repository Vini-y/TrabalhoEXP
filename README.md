# Sistema de Gerenciamento de Usuários – Trabalho EXP

Aplicação Full Stack para cadastro, visualização, edição e exclusão de usuários.

## 🧰 Tecnologias

- Frontend: React + Vite, Axios
- Backend: Node.js, Express, MySQL
- Estilo: CSS puro

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Vini-y/TrabalhoEXP.git
cd TrabalhoEXP
```

---

## 📦 Banco de Dados

Este projeto utiliza **MySQL** como banco de dados.

- O script de criação do banco e das tabelas está em:  
  `SQL/CREATE_DB.sql`

- Para popular o banco com dados de exemplo, utilize (opcional):  
  `SQL/INSERTS.sql`

> Execute o `CREATE_DB.sql` antes de iniciar o backend.

- Também tem o arquivo de exportação do banco de dados em:
  `SQL/DBexport.sql`

---

### 2. Configuração do Backend

```bash
cd backend
npm install
```

#### 📦 Dependências instaladas:

- express
- cors
- dotenv
- mysql2

#### 🔐 Crie o arquivo `.env` com as variáveis do banco:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```

#### ▶️ Inicie o backend:

```bash
npm start
```

> O backend ficará disponível em `http://localhost:5000`.

---

### 3. Configuração do Frontend

```bash
cd frontend
npm install
```

#### 📦 Dependência usada:

- axios

#### ▶️ Inicie o frontend:

```bash
npm run dev
```

> O frontend rodará em `http://localhost:5173`.

---

## ✅ Pronto!

Agora você pode acessar o sistema em `http://localhost:5173`  
e utilizar as funcionalidades de cadastro, edição, visualização e exclusão de usuários.
