const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${apiBaseUrl.replace(/\/$/, '')}/api/respostas`;

export async function saveAnswer(questionId: string, alternativaEscolhida: number): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, alternativaEscolhida })
  });

  if (!response.ok) throw new Error('Não foi possível registrar a resposta.');
}
