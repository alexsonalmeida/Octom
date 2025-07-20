# Octom

**Octom** é uma plataforma completa para **organização de times**, focada em **comunicação**, **gestão de tarefas**, **compartilhamento de arquivos** e **monitoramento de progresso** através de dashboards interativos. Ideal para equipes que buscam produtividade, alinhamento e centralização das atividades em um só lugar.

---

## 📌 Objetivo do Projeto

O Octom foi desenvolvido para auxiliar times na organização do trabalho colaborativo, permitindo:

- Comunicação fluida por meio de **chats em grupo ou individuais**;
- Controle de tarefas utilizando um **quadro Kanban** com estágios como _backlog_, _to do_, _in progress_ e _review_;
- **Gerenciamento de perfil** dos usuários;
- **Compartilhamento de arquivos**, respeitando limites de espaço;
- **Visualização de informações e progresso** por meio de dashboards.

---

## 🚀 Funcionalidades

- 📊 **Dashboard** com gráficos de:
  - Tasks concluídas e novas;
  - Evolução de tarefas ao longo do tempo;
  - Progresso detalhado de uma task.

- 💬 **Mensagens**:
  - Envio e recebimento de mensagens em **grupos de time** ou **conversas individuais**.

- ✅ **Tasks**:
  - Cadastro de novas tarefas;
  - Visualização em **Kanban** com movimentação por status.

- 📁 **Arquivos**:
  - Upload e gerenciamento de arquivos do time;
  - Limites definidos de armazenamento por usuário/time.

- ⚙️ **Perfil do Usuário**:
  - Atualização de informações pessoais e preferências.

---

## 🧱 Arquitetura

A arquitetura do Octom é composta por um **frontend em Next.js** e um **backend em NestJS**, com comunicação eficiente e segura entre os dois.

### 🖥️ Frontend (Next.js)

- Responsável pela **interface com o usuário**;
- Utiliza **Server-side rendering (SSR)** para desempenho e SEO;
- Faz chamadas ao backend via **Axios** por meio do próprio **Server do Next.js** (middleware).

### 🛠️ Backend (NestJS)

- API robusta estruturada com **NestJS**, sobre **Node.js**;
- Se comunica com:
  - 📦 **PostgreSQL** para persistência de dados, utilizando **Prisma ORM**;
  - ☁️ **Supabase** para armazenamento e recuperação de arquivos (upload de arquivos, imagens, etc.).

---

## 🧪 Tecnologias Utilizadas

| Camada         | Tecnologia              |
|----------------|--------------------------|
| Frontend       | Next.js, TypeScript, Axios |
| Backend        | NestJS, Node.js, Prisma  |
| Banco de Dados | PostgreSQL               |
| Armazenamento  | Supabase                 |
| ORM            | Prisma                   |

---
