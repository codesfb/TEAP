import type { Question } from './types';

export const questions: Question[] = [
  {
    id: 'antibiotic-001', textId: 'antibiotic-resistance', tema: 'Reading comprehension',
    enunciado: 'What is the main idea of the passage?',
    alternativas: ['Bacteriophages are the most effective treatment for bacterial infections.', 'Antibiotic resistance is a growing problem driven by misuse, and researchers are seeking ways to counter it.', 'Livestock farming should be banned to prevent disease.', 'Patients are solely responsible for the failure of modern antibiotics.'],
    respostaCorreta: 1
  },
  {
    id: 'antibiotic-002', textId: 'antibiotic-resistance', tema: 'Vocabulary',
    enunciado: "In the sentence 'those carrying mutations that confer resistance survive and reproduce,' the word 'confer' is closest in meaning to:",
    alternativas: ['discuss', 'grant', 'remove', 'measure'],
    respostaCorreta: 1
  },
  {
    id: 'antibiotic-003', textId: 'antibiotic-resistance', tema: 'Reading comprehension',
    enunciado: 'According to the text, why are antibiotics often given to livestock?',
    alternativas: ['To treat existing infections in the animals', 'To promote growth, not necessarily to treat disease', 'To comply with international export regulations', 'To prevent bacteriophage contamination'],
    respostaCorreta: 1
  },
  {
    id: 'antibiotic-004', textId: 'antibiotic-resistance', tema: 'Reference',
    enunciado: "In the second paragraph, what does the phrase 'this phenomenon' refer to?",
    alternativas: ['The development of bacteriophage therapy', 'The pre-antibiotic era', 'The spread of antibiotic resistance', 'Public education campaigns'],
    respostaCorreta: 2
  },
  {
    id: 'antibiotic-005', textId: 'antibiotic-resistance', tema: 'Inference',
    enunciado: 'What can be inferred about patients who stop taking antibiotics early?',
    alternativas: ['They unintentionally contribute to the survival of partially resistant bacteria.', 'They are following medical guidelines correctly.', 'They have no effect on bacterial resistance.', 'They are more likely to develop bacteriophage infections.'],
    respostaCorreta: 0
  }
];
