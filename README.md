# Backend - MedLembrete

API que armazena usuários e medicamentos, usada pela web (cadastro) e pelo app mobile (notificações).

## Como rodar

```bash
npm install
node src/index.js
```

O servidor inicia em `http://localhost:3000`.

## Rotas disponíveis

### Autenticação

**POST /auth/cadastro**
```json
{ "nome": "Rodrigo", "email": "rodrigo@teste.com", "senha": "senha123" }
```

**POST /auth/login**
```json
{ "email": "rodrigo@teste.com", "senha": "senha123" }
```
Retorna um `token`. Esse token deve ser enviado em todas as rotas de medicamentos, no header:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

### Medicamentos (requer autenticação)

**GET /medicamentos** — lista todos os medicamentos do usuário logado

**POST /medicamentos**
```json
{
  "nome": "Losartana",
  "dosagem": "50mg",
  "horarios": ["08:00", "20:00"],
  "observacoes": "Tomar com água"
}
```

**PUT /medicamentos/:id** — edita um medicamento (mesmo formato do POST, todos os campos opcionais)

**DELETE /medicamentos/:id** — remove um medicamento

## Estrutura de pastas

```
backend/
├── src/
│   ├── db/database.js          # configuração do banco de dados
│   ├── middleware/auth.js      # verifica se usuário está logado
│   ├── routes/authRoutes.js    # cadastro e login
│   ├── routes/medicamentoRoutes.js  # CRUD de medicamentos
│   └── index.js                # arquivo principal
├── data/db.json                # banco de dados (criado automaticamente)
├── .env                        # variáveis de ambiente (não subir pro git)
└── package.json
```

## Nota importante sobre o banco de dados

Por enquanto estamos usando **lowdb**, que salva tudo em um arquivo JSON
(`data/db.json`). Isso é ótimo para aprender e testar, mas **não é
recomendado para produção** com muitos usuários simultâneos. Quando o
projeto estiver mais maduro, trocamos para PostgreSQL ou Firebase — a
estrutura das rotas não vai mudar muito, só a forma de acessar os dados.

## Próximos passos (Fase 2)

Criar o frontend web em React para cadastrar os medicamentos usando estas rotas.
