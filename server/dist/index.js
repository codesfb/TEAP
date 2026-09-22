import cors from 'cors';
import express from 'express';
import { db } from './db.js';
const correctAnswers = {
    'antibiotic-001': 1, 'antibiotic-002': 1, 'antibiotic-003': 1, 'antibiotic-004': 2, 'antibiotic-005': 0
};
const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
app.use(cors({
    origin(origin, callback) {
        // Permite chamadas sem Origin, como curl e verificações de disponibilidade.
        if (!origin || allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error('Origem não permitida pelo CORS.'));
    }
}));
app.use(express.json());
app.post('/api/respostas', (req, res) => {
    const { questionId, alternativaEscolhida } = req.body;
    if (typeof questionId !== 'string' || !Number.isInteger(alternativaEscolhida) || !(questionId in correctAnswers)) {
        return res.status(400).json({ error: 'questionId ou alternativaEscolhida inválidos.' });
    }
    const correta = Number(alternativaEscolhida === correctAnswers[questionId]);
    const timestamp = Date.now();
    const result = db.prepare('INSERT INTO respostas (question_id, alternativa_escolhida, correta, timestamp) VALUES (?, ?, ?, ?)').run(questionId, alternativaEscolhida, correta, timestamp);
    return res.status(201).json({ id: result.lastInsertRowid, correta: Boolean(correta), timestamp });
});
app.get('/api/resultados', (_req, res) => {
    const respostas = db.prepare('SELECT id, question_id AS questionId, alternativa_escolhida AS alternativaEscolhida, correta, timestamp FROM respostas ORDER BY id').all();
    const total = respostas.length;
    const acertos = respostas.reduce((sum, resposta) => sum + resposta.correta, 0);
    res.json({ respostas, resumo: { totalRespondidas: total, totalAcertos: acertos, aproveitamento: total ? Number(((acertos / total) * 100).toFixed(2)) : 0 } });
});
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`Servidor TEAP em http://localhost:${port}`));
