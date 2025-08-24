# Chat IA - Back-end

![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-6.14-blue?logo=prisma)
![WebSocket](https://img.shields.io/badge/WebSocket-8.18-cyan)

O back-end do Chat IA é uma API construída para gerenciar autenticação de usuários, chats privados e mensagens em tempo real via WebSocket. Seu objetivo é fornecer uma base funcional para comunicação individual de cada usuário, garantindo privacidade nos chats e persistência do histórico de mensagens. Ele utiliza autenticação JWT e criptografia de senhas com Bcrypt, garantindo segurança e confiabilidade no armazenamento e na troca de informações entre o usuário e o sistema.

## Tecnologias

- **Node.js**
- **TypeScript**
- **Express 5**
- **WebSocket (ws)**
- **Prisma (PostgreSQL)**
- **JWT para autenticação**
- **Bcrypt para hash de senhas**
- **dotenv para variáveis de ambiente**

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/api-chat-ia.git

# Entre na pasta do back-end
cd api-chat-ia

# Instale as dependências
npm install

# Crie um arquivo .env na raiz com as variáveis necessárias haverá um arquivo de exemplo.

# Rode o servidor em modo desenvolvimento
npm run dev
```

## Variáveis de Ambiente

O back-end do Chat IA depende de algumas variáveis de ambiente para funcionar corretamente. Crie um arquivo `.env` na raiz do projeto e defina os valores conforme abaixo:

```env
# URL de conexão com o banco de dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

# Porta que o servidor vai rodar (ex: 3000)
PORT=3000

# Chave da API Gemini para integração com respostas inteligentes
GEMINI_API_KEY=YOUR_KEY_GEMINI

# Número de rounds para hash das senhas com Bcrypt
BCRYPT_SALT=8

# Chave secreta usada para assinar tokens JWT
JWT_SECRET_KEY=sua_chave_secreta

# Tempo de expiração do token JWT (ex: "1h", "7d")
JWT_EXPIRE_IN=1d
```

## Funcionalidades

- Registro e login de usuários com JWT

- Chats privados por usuário

- Envio e recebimento de mensagens em tempo real via WebSocket

- Armazenamento de mensagens e histórico no banco de dados

- Hash de senhas com Bcrypt

- Suporte a múltiplos usuários (cada usuário possui seu próprio chat privado)
