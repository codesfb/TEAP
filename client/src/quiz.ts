import { saveAnswer } from './api';
import { questions } from './questions';
import { texts } from './texts';

const letters = ['A', 'B', 'C', 'D', 'E'];
let current = 0;
let correct = 0;
let answered = false;

function themeToggle(): string {
  const isDark = document.documentElement.classList.contains('dark');
  return `<button id="theme-toggle" aria-label="Alternar modo escuro" class="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:bg-[#4a4a4a] dark:text-zinc-100 dark:hover:bg-[#5a5a5a] dark:focus:ring-[#5a5a5a]"><span aria-hidden="true">${isDark ? '☀️' : '🌙'}</span>${isDark ? 'Modo claro' : 'Modo escuro'}</button>`;
}

function setupThemeToggle(app: HTMLElement): void {
  app.querySelector<HTMLButtonElement>('#theme-toggle')?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('teap-theme', isDark ? 'dark' : 'light');
    renderQuestion(app);
  });
}

function readingPanel(textId: string): string {
  const text = texts.find((item) => item.id === textId);
  if (!text) return '';
  return `<article class="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-[#4a4a4a] dark:bg-[#303030] sm:p-6"><p class="text-xs font-bold uppercase tracking-widest text-red-700">TEAP · Reading text</p><h2 class="mt-2 text-xl font-extrabold text-slate-900 dark:text-zinc-50">${text.titulo}</h2><div class="mt-4 space-y-4 text-sm leading-6 text-slate-700 dark:text-zinc-300 sm:text-base">${text.conteudo.map((paragraph) => `<p>${paragraph}</p>`).join('')}</div></article>`;
}

export function startQuiz(app: HTMLElement): void {
  renderQuestion(app);
}

function renderQuestion(app: HTMLElement): void {
  const question = questions[current];
  if (!question) return renderSummary(app);

  answered = false;
  app.innerHTML = `
    <section class="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-8 sm:px-6">
      <div class="w-full rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-10 dark:bg-[#353535] dark:ring-[#4a4a4a]">
        <div class="mb-8 flex flex-wrap items-center justify-between gap-3">
          <span class="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-700 dark:bg-[#5a2525] dark:text-red-200">${question.tema}</span>
          <div class="flex items-center gap-3"><span class="text-sm font-semibold text-slate-500 dark:text-zinc-400">${current + 1} de ${questions.length}</span>${themeToggle()}</div>
        </div>
        <div class="mb-7 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-[#4a4a4a]"><div class="h-full bg-red-700 transition-all" style="width: ${((current + 1) / questions.length) * 100}%"></div></div>
        ${readingPanel(question.textId)}
        <h1 class="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl dark:text-zinc-50">${question.enunciado}</h1>
        <div id="alternatives" class="mt-8 grid gap-3"></div>
        <div id="feedback" class="mt-6" aria-live="polite"></div>
        <button id="next" class="mt-6 hidden w-full rounded-xl bg-red-700 px-5 py-3 font-bold text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 sm:w-auto">Próxima questão</button>
      </div>
    </section>`;

  const alternatives = app.querySelector<HTMLDivElement>('#alternatives')!;
  question.alternativas.forEach((alternative, index) => {
    const button = document.createElement('button');
    button.className = 'alternative flex w-full items-start gap-3 rounded-xl border-2 border-slate-200 p-4 text-left font-medium text-slate-700 transition hover:border-red-500 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-200 dark:border-[#4a4a4a] dark:text-zinc-100 dark:hover:bg-[#404040]';
    button.innerHTML = `<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold dark:bg-[#4a4a4a]">${letters[index]}</span><span>${alternative}</span>`;
    button.addEventListener('click', () => answer(app, index));
    alternatives.append(button);
  });
  app.querySelector<HTMLButtonElement>('#next')!.addEventListener('click', () => { current++; renderQuestion(app); });
  setupThemeToggle(app);
}

function answer(app: HTMLElement, selected: number): void {
  if (answered) return;
  answered = true;
  const question = questions[current];
  const isCorrect = selected === question.respostaCorreta;
  if (isCorrect) correct++;

  app.querySelectorAll<HTMLButtonElement>('.alternative').forEach((button, index) => {
    button.disabled = true;
    button.classList.remove('hover:border-red-500', 'hover:bg-red-50');
    if (index === question.respostaCorreta) button.classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-[#1f4a3d]');
    else if (index === selected) button.classList.add('border-red-600', 'bg-red-50', 'dark:bg-[#5a2525]');
  });
  const feedback = app.querySelector<HTMLDivElement>('#feedback')!;
  feedback.innerHTML = `<p class="rounded-xl p-4 font-bold ${isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-[#1f4a3d] dark:text-emerald-100' : 'bg-red-100 text-red-800 dark:bg-[#5a2525] dark:text-red-100'}">${isCorrect ? 'Resposta correta!' : `Resposta incorreta. A correta é ${letters[question.respostaCorreta]}.`}</p>`;
  app.querySelector<HTMLButtonElement>('#next')!.classList.remove('hidden');
  saveAnswer(question.id, selected).catch(() => {
    feedback.insertAdjacentHTML('beforeend', '<p class="mt-2 text-sm font-normal">Sua resposta foi contabilizada localmente, mas não foi possível salvá-la no servidor.</p>');
  });
}

function renderSummary(app: HTMLElement): void {
  const percentage = Math.round((correct / questions.length) * 100);
  app.innerHTML = `<section class="mx-auto flex min-h-screen max-w-xl items-center px-4 py-8"><div class="w-full rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200 sm:p-12 dark:bg-[#353535] dark:ring-[#4a4a4a]"><div class="flex justify-end">${themeToggle()}</div><p class="mt-4 text-sm font-bold uppercase tracking-widest text-red-700">Quiz finalizado</p><h1 class="mt-3 text-3xl font-extrabold text-slate-900 dark:text-zinc-50">Seu resultado</h1><p class="my-8 text-6xl font-black text-red-700">${percentage}%</p><p class="text-lg text-slate-600 dark:text-zinc-300"><strong>${correct}</strong> acertos e <strong>${questions.length - correct}</strong> erros em ${questions.length} questões.</p><button id="restart" class="mt-9 rounded-xl bg-red-700 px-6 py-3 font-bold text-white hover:bg-red-800">Refazer quiz</button></div></section>`;
  app.querySelector<HTMLButtonElement>('#restart')!.addEventListener('click', () => { current = 0; correct = 0; renderQuestion(app); });
  setupThemeToggle(app);
}
