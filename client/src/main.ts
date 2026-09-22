import './style.css';
import { startQuiz } from './quiz';

const app = document.querySelector<HTMLElement>('#app');
if (!app) throw new Error('Elemento #app não encontrado.');

const savedTheme = localStorage.getItem('teap-theme');
const useDarkTheme = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark', useDarkTheme);

startQuiz(app);
