# Sistema de Gerenciamento de Usuários – Trabalho EXP

Aplicação Full Stack para cadastro, visualização, edição e exclusão de usuários.

## 🧰 Tecnologias

- Frontend: React + Vite, Axios
- Backend: Node.js, Express, MySQL
- Estilo: CSS puro com estilo inspirado no Material Design

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Vini-y/TrabalhoEXP.git
cd TrabalhoEXP
```

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

## 📦 Banco de Dados

Este projeto utiliza **MySQL** como banco de dados. Para configurar corretamente:

### 1. Crie o banco de dados e as tabelas

No seu cliente MySQL (como o MySQL Workbench, DBeaver ou linha de comando), execute o script:

```bash
mysql -u seu_usuario -p seu_banco < SQL/CREATE_DB.sql

```
### 2. Para usar como exemplo também tem um arquivo de inserts, execute:

```sql
SQL/INSERTS.sql

```

---

## ✅ Pronto!

Agora você pode acessar o sistema em `http://localhost:5173`  
e utilizar as funcionalidades de cadastro, edição, visualização e exclusão de usuários.
