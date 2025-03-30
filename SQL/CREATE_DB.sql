Drop database if exists trabalhoexp;
create database trabalhoexp;

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  anoNascimento INT NOT NULL,
  endereco VARCHAR(200) NOT NULL,
  genero ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);