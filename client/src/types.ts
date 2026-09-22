export interface Question {
  id: string;
  textId: string;
  tema: string;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
}

export interface ReadingText {
  id: string;
  titulo: string;
  conteudo: string[];
}
