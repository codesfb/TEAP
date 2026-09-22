export interface AnswerInput {
  questionId: string;
  alternativaEscolhida: number;
}

export interface StoredAnswer extends AnswerInput {
  id: number;
  correta: number;
  timestamp: number;
}
