# TEAP

## Pronpt

```sql
CREATE TABLE respostas (
id INTEGER PRIMARY KEY AUTOINCREMENT,
question_id TEXT NOT NULL,
alternativa_escolhida INTEGER NOT NULL,
correta INTEGER NOT NULL,
timestamp INTEGER NOT NULL
);
```

## Arquitecture 

teap-quiz/
├── client/                    # frontend (o que a pessoa usa pra responder)
│   ├── index.html
│   ├── src/
│   │   ├── main.ts
│   │   ├── questions.ts       # questões continuam estáticas aqui
│   │   ├── types.ts
│   │   ├── quiz.ts
│   │   ├── api.ts             # funções fetch() pro backend
│   │   └── style.css          # diretivas do Tailwind
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── tsconfig.json
│
└── server/                    # backend (guarda respostas + você vê resultado)
    ├── src/
    │   ├── index.ts           # servidor Express
    │   ├── db.ts              # setup do SQLite
    │   └── types.ts
    ├── teap.db                # arquivo do banco (gerado automaticamente)
    ├── package.json
    └── tsconfig.json


## Pronpt
Quero criar um app web em TypeScript (front e back) para me ajudar a estudar para o TEAP (questões de múltipla escolha sobre biologia e saúde). Uma pessoa vai responder as questões e eu quero poder ver o resultado dela depois.

Arquitetura: monorepo com duas pastas, "client" e "server".

CLIENT (Vite + TypeScript + Tailwind CSS):
1. Sem frameworks como React/Vue — TypeScript puro manipulando o DOM.
2. Tailwind configurado via plugin oficial do Vite, com dark mode habilitado (prefers-color-scheme).
3. Banco de questões estático em src/questions.ts com esta interface:
   interface Question {
     id: string;
     tema: string;
     enunciado: string;
     alternativas: string[];
     respostaCorreta: number;
   }
4. Faça tipo tese prime com cor de botões vermelho forte e que adapte tanto pra dispositivo movel quanto pc Tela única mostrando uma questão por vez com alternativas clicáveis, feedback imediato (certo/errado, destacando a correta) e botão "Próxima questão".
5. Ao responder cada questão, enviar via fetch POST para http://localhost:3000/api/respostas com { questionId, alternativaEscolhida }.
6. Ao terminar todas as questões, mostrar resumo local (acertos/erros/%).

SERVER (Node + Express + TypeScript + better-sqlite3):
1. Banco SQLite em arquivo (server/teap.db), criado automaticamente se não existir, com uma tabela "respostas": id, question_id, alternativa_escolhida, correta, timestamp.
2. Rota POST /api/respostas: recebe { questionId, alternativaEscolhida }, calcula se está correta comparando com o gabarito (pode duplicar o array de respostas corretas no server ou receber a info do client — escolha a abordagem mais simples), grava no banco.
3. Rota GET /api/resultados: retorna todas as respostas salvas, mais um resumo (total de questões respondidas, total de acertos, % de aproveitamento).
4. CORS habilitado para o client rodar em outra porta durante o desenvolvimento.

Crie toda a estrutura de pastas, os arquivos de configuração (package.json, tsconfig.json, tailwind.config.js, postcss.config.js) de ambas as pastas, e preencha questions.ts com 5 questões de exemplo sobre biologia/saúde. Ao final, me diga os comandos exatos para rodar client e server localmente.
