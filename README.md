📌 MoveBairro

Sistema web para incentivar atividades físicas na comunidade através de gamificação, registrando percursos, distância e tempo das atividades.

🎯 Objetivo

Identificar e minimizar o problema do sedentarismo em comunidades locais, incentivando a prática de atividades físicas por meio de um sistema de monitoramento e ranking.

👥 Público-alvo
Pessoas sedentárias
Jovens e adultos da comunidade
Usuários interessados em melhorar a saúde
Pessoas que buscam motivação para se exercitar

🚀 Funcionalidades
Cadastro de usuários
Login com autenticação
Início de atividade física
Registro de coordenadas GPS
Cálculo de distância percorrida
Finalização de atividade
Armazenamento no banco de dados

🛠️ Tecnologias utilizadas
Backend
Node.js
Express
PostgreSQL
Frontend
HTML
JavaScript (Fetch API)

🗄️ Banco de dados

Principais tabelas:

users
activities
coordinates

🔗 Endpoints da API
Usuários
POST /users/register
POST /users/login
Atividades
POST /activities/start
POST /activities/location
POST /activities/finish
GET /activities

▶️ Como rodar o projeto
1. Clonar o repositório
git clone <seu-repo>
2. Entrar na pasta backend
cd backend
3. Instalar dependências
npm install
4. Criar arquivo .env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=movebairro
DB_PASSWORD=sua_senha
DB_PORT=5432
5. Rodar servidor
node server.js

📌 Status do projeto
Backend: ✅ Concluído
Banco de dados: ✅ Concluído
Frontend: 🔄 Em desenvolvimento

💡 Melhorias futuras
Ranking de usuários
Dashboard com estatísticas
Visualização do trajeto no mapa
Aplicativo mobile
