// ==========================================
// NAVEGAÇÃO E INTERFACE DAS TABS
// ==========================================

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));

  document.querySelectorAll('.nav-btn').forEach(el => {
    el.classList.remove('bg-white', 'text-indigo-600', 'shadow-xs');
    el.classList.add('text-slate-600');
  });

  document.querySelectorAll('.mobile-nav-btn').forEach(el => {
    el.classList.remove('text-indigo-600');
    el.classList.add('text-slate-400');
  });

  document.getElementById('tab-' + tabId).classList.add('active');

  const btn = document.getElementById('btn-' + tabId);
  if(btn) {
    btn.classList.remove('text-slate-600');
    btn.classList.add('bg-white', 'text-indigo-600', 'shadow-xs');
  }

  const titlesMap = { 
    'learn': 'Aprenda 📚', 
    'game': 'Simulador 🎮', 
    'calculator': 'Calculadora 🧮', 
    'quiz': 'Quiz 🏆' 
  };

  const topIndicator = document.getElementById('mobile-top-indicator');
  if(topIndicator) topIndicator.textContent = titlesMap[tabId] || 'UniVida 🎓';

  const mobileBtnMap = { 'learn': 0, 'game': 1, 'calculator': 2, 'quiz': 3 };
  const mButtons = document.querySelectorAll('.mobile-nav-btn');
  if(mButtons[mobileBtnMap[tabId]]) {
    mButtons[mobileBtnMap[tabId]].classList.remove('text-slate-400');
    mButtons[mobileBtnMap[tabId]].classList.add('text-indigo-600');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleCardDetails(id, btn) {
  const el = document.getElementById(id);
  const icon = btn.querySelector('i');
  el.classList.toggle('hidden');
  if(el.classList.contains('hidden')) {
    btn.querySelector('span').textContent = 'Expandir Conteúdo';
    icon.style.transform = 'rotate(0deg)';
  } else {
    btn.querySelector('span').textContent = 'Recolher Conteúdo';
    icon.style.transform = 'rotate(180deg)';
  }
}

// ==========================================
// GAMIFICAÇÃO & SISTEMA DE BADGES
// ==========================================

const userBadges = {
  reserva: { id: 'badge-reserva', name: 'Reserva Blindada 🛡️', desc: 'Alcançou orçamento com saldo positivo na calculadora.', unlocked: false },
  survivor: { id: 'badge-survivor', name: 'Sobrevivente do Período 🎓', desc: 'Completou o jogo com CR > 80 e Saúde Mental > 70.', unlocked: false },
  zen: { id: 'badge-zen', name: 'Mestre do Zen 🧘', desc: 'Concluiu um mês com Saúde Mental acima de 85.', unlocked: false },
  poupador: { id: 'badge-poupador', name: 'Mestre Mão de Vaca 💰', desc: 'Manteve mais de R$ 1.500 no simulador.', unlocked: false },
  quizMaster: { id: 'badge-quiz', name: 'Gênio das Finanças 💡', desc: 'Gabaritou o Quiz com 100 pontos.', unlocked: false }
};

function unlockBadge(badgeKey) {
  const badge = userBadges[badgeKey];
  if (badge && !badge.unlocked) {
    badge.unlocked = true;
    renderBadgesUI();
    showToastNotification(`🏆 Nova Conquista Desbloqueada: ${badge.name}!`);
  }
}

function renderBadgesUI() {
  const container = document.getElementById('global-badges-container');
  if (!container) return;

  container.innerHTML = '';
  Object.keys(userBadges).forEach(key => {
    const b = userBadges[key];
    const badgeCard = document.createElement('div');
    
    if (b.unlocked) {
      badgeCard.className = "p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-center flex flex-col items-center justify-center transition-all shadow-xs scale-100 hover:scale-105";
      badgeCard.innerHTML = `
        <span class="text-xl mb-1">${b.name.split(' ').pop()}</span>
        <h5 class="text-xs font-black text-indigo-900 leading-tight">${b.name.replace(/ [^\s]+$/, '')}</h5>
        <p class="text-[9px] text-indigo-700 font-medium mt-0.5 leading-tight">${b.desc}</p>
        <span class="mt-1.5 px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black rounded-full uppercase">Desbloqueado</span>
      `;
    } else {
      badgeCard.className = "p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center opacity-50 grayscale transition-all";
      badgeCard.innerHTML = `
        <span class="text-xl mb-1">🔒</span>
        <h5 class="text-xs font-bold text-slate-600 leading-tight">${b.name.replace(/ [^\s]+$/, '')}</h5>
        <p class="text-[9px] text-slate-400 font-medium mt-0.5 leading-tight">${b.desc}</p>
        <span class="mt-1.5 px-2 py-0.5 bg-slate-200 text-slate-600 text-[8px] font-bold rounded-full uppercase">Bloqueado</span>
      `;
    }
    container.appendChild(badgeCard);
  });
}

function showToastNotification(message) {
  const toast = document.createElement('div');
  toast.className = "fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center space-x-3 z-50 animate-bounce";
  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ==========================================
// DICAS RELÂMPAGO & MODAIS
// ==========================================

const quickTipsData = {
  softwares: {
    title: "💻 Softwares & Benefícios Gratuitos",
    content: `
      <ul class="space-y-2 text-xs text-slate-700">
        <li><strong>GitHub Student Developer Pack:</strong> Dá acesso gratuito ao Canva Pro, domínios web e JetBrains.</li>
        <li><strong>Spotify & Prime Student:</strong> Assinaturas pela metade do preço comprovando a matrícula.</li>
        <li><strong>Notion & Office 365:</strong> Licenças premium grátis cadastrando seu e-mail institucional (.edu ou @aluno.uf.br).</li>
      </ul>
    `
  },
  transporte: {
    title: "🚌 Passe Livre & Desconto no Transporte",
    content: `
      <ul class="space-y-2 text-xs text-slate-700">
        <li>• <strong>Meia-Passagem:</strong> Garanta 50% de desconto cadastrando sua carteirinha estudantil na empresa de transporte local.</li>
        <li>• <strong>Passe Livre Integrado:</strong> Alunos do CadÚnico, Prouni e FIES possuem isenção total em diversos municípios.</li>
      </ul>
    `
  },
  livros: {
    title: "📚 Dicas para Livros e Materiais Didáticos",
    content: `
      <ul class="space-y-2 text-xs text-slate-700">
        <li><strong>Plataformas Digitais:</strong> Utilize bases como Pearson e Minha Biblioteca oferecidas pelo portal da sua faculdade.</li>
        <li><strong>Grupos de Troca com Veteranos:</strong> Compre cópias usadas de ex-alunos com até 70% de desconto.</li>
        <li><strong>Apps de Scanner:</strong> Utilize o CamScanner para salvar partes de livros da biblioteca sem gastar com impressões.</li>
      </ul>
    `
  }
};

function openTipModal(tipKey) {
  const tip = quickTipsData[tipKey];
  if (!tip) return;

  document.getElementById('modal-tip-title').textContent = tip.title;
  document.getElementById('modal-tip-body').innerHTML = tip.content;
  document.getElementById('quick-tip-modal').classList.remove('hidden');
}

function closeTipModal() {
  document.getElementById('quick-tip-modal').classList.add('hidden');
}

// ==========================================
// SIMULADOR DE VIDA UNIVERSITÁRIA
// ==========================================

let gameState = {
  name: '',
  course: '',
  housing: '',
  job: '',
  money: 1000,
  grades: 75,
  mental: 80,
  energy: 85,
  month: 1,
  maxMonths: 6,
  income: 0,
  rent: 0
};

const gameEvents = [
  {
    month: 1,
    title: "Mês 1: Bibliografia Acadêmica",
    desc: "A lista de livros obrigatórios foi divulgada. Como você vai estudar?",
    choices: [
      { text: "Comprar livros físicos novos (R$ 280)", money: -280, grades: +12, mental: +5, energy: 0, feedback: "Bons livros, estudo garantido!" },
      { text: "Usar biblioteca e PDFs (R$ 30)", money: -30, grades: +6, mental: -5, energy: -10, feedback: "Economizou dinheiro, gastou horas em filas de xerox." },
      { text: "Estudar só por anotações velhas (R$ 0)", money: 0, grades: -15, mental: +5, energy: +10, feedback: "Conteúdo desatualizado prejudicou sua nota." }
    ]
  },
  {
    month: 2,
    title: "Mês 2: Semana de Provas",
    desc: "Dois trabalhos práticos e duas exibições caíram na mesma semana.",
    choices: [
      { text: "Virar noites estudando à base de café (R$ 40)", money: -40, grades: +20, mental: -25, energy: -30, feedback: "Boas notas, mas sua saúde mental caiu." },
      { text: "Montar grupo de estudo (R$ 20)", money: -20, grades: +10, mental: +10, energy: -5, feedback: "Dividir tarefas aliviou o estresse!" },
      { text: "Descansar e fazer no ritmo normal", money: 0, grades: -10, mental: +15, energy: +15, feedback: "Dormiu bem, mas as notas ficaram abaixo da média." }
    ]
  },
  {
    month: 3,
    title: "Mês 3: Festa do Diretório Acadêmico",
    desc: "A maior festa do ano da faculdade está acontecendo.",
    choices: [
      { text: "Ir com ingresso VIP e pós-festa (R$ 180)", money: -180, grades: -10, mental: +30, energy: +10, feedback: "Muita diversão, mas o bolso sentiu o impacto!" },
      { text: "Ir com ingresso simples (R$ 60)", money: -60, grades: 0, mental: +15, energy: -5, feedback: "Curtiu com os amigos sem gastar demais." },
      { text: "Ficar em casa economizando", money: 0, grades: +5, mental: -15, energy: +10, feedback: "Poupou dinheiro, mas sentiu que perdeu a integração." }
    ]
  },
  {
    month: 4,
    title: "Mês 4: Notebook Quebrado!",
    desc: "O computador travou logo na semana de entregar o projeto principal.",
    choices: [
      { text: "Conserto urgente na assistência (R$ 350)", money: -350, grades: +10, mental: -10, energy: -5, feedback: "Gasto inesperado alto, mas projeto entregue." },
      { text: "Pedir emprestado e adaptar programas (R$ 0)", money: 0, grades: -5, mental: -20, energy: -20, feedback: "Zero custo, mas exigiu muita paciência." },
      { text: "Usar os PCs da faculdade até tarde", money: 0, grades: 0, mental: -10, energy: -15, feedback: "Funcionou, mas passou noites no laboratório." }
    ]
  },
  {
    month: 5,
    title: "Mês 5: Freela Extra",
    desc: "Surgiu a chance de um trabalho rápido de 5 dias.",
    choices: [
      { text: "Aceitar o freela de madrugada (+R$ 350)", money: +350, grades: -12, mental: -15, energy: -25, feedback: "Ótima renda extra no bolso!" },
      { text: "Recusar para focar no semestre", money: 0, grades: +12, mental: +10, energy: +10, feedback: "Priorizou suas notas e descansou." }
    ]
  },
  {
    month: 6,
    title: "Mês 6: Exames Finais",
    desc: "Última semana para garantir a aprovação sem exame final.",
    choices: [
      { text: "Pagar monitoria particular (R$ 120)", money: -120, grades: +25, mental: +5, energy: -5, feedback: "Passou de ano com tranquilidade!" },
      { text: "Estudar em grupo com lanches (R$ 30)", money: -30, grades: +15, mental: 0, energy: -10, feedback: "Revisão eficiente em equipe." },
      { text: "Ir direto sem revisão especial", money: 0, grades: 0, mental: +10, energy: +10, feedback: "Economizou esforço, mas dependeu da sorte." }
    ]
  }
];

function startGame(e) {
  e.preventDefault();
  
  gameState.name = document.getElementById('player-name').value || 'Estudante';
  gameState.course = document.getElementById('player-course').value;
  gameState.housing = document.getElementById('player-housing').value;
  gameState.job = document.getElementById('player-job').value;
  
  gameState.income = 800;
  if (gameState.job === 'cafe') gameState.income += 600;
  if (gameState.job === 'explicacoes') gameState.income += 1000;

  gameState.rent = 0;
  if (gameState.housing === 'republica') gameState.rent = 550;
  if (gameState.housing === 'sozinho') gameState.rent = 1100;

  gameState.money = 1200;
  gameState.grades = 75;
  gameState.mental = 80;
  gameState.energy = 85;
  gameState.month = 1;

  document.getElementById('display-name').textContent = gameState.name;
  document.getElementById('display-course').textContent = gameState.course;
  document.getElementById('avatar-initial').textContent = gameState.name.charAt(0).toUpperCase();

  document.getElementById('game-setup-screen').classList.add('hidden');
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('game-play-screen').classList.remove('hidden');

  startMonthCycle();
}

function startMonthCycle() {
  const fixedFood = 300;
  const netMonthly = gameState.income - gameState.rent - fixedFood;
  gameState.money += netMonthly;
  gameState.energy = Math.min(100, gameState.energy + 15);

  if (gameState.mental >= 85) unlockBadge('zen');

  updateStatsUI();
  renderDilemma();
}

function renderDilemma() {
  if (gameState.money < 0) {
    endGame(false, "❌ Falência Financeira! Você acumulou dívidas não pagas.");
    return;
  }
  if (gameState.grades < 50) {
    endGame(false, "❌ Reprovação por Nota! Seu CR ficou abaixo da média mínima.");
    return;
  }
  if (gameState.mental <= 0) {
    endGame(false, "❌ Burnout Severo! O estresse exigiu o trancamento do semestre.");
    return;
  }
  if (gameState.month > gameState.maxMonths) {
    endGame(true, "🎉 Semestre Concluído! Você superou os desafios acadêmicos e financeiros.");
    return;
  }

  document.getElementById('display-month').textContent = gameState.month;

  const currentEvent = gameEvents.find(e => e.month === gameState.month);
  if (!currentEvent) return;

  document.getElementById('dilemma-title').textContent = currentEvent.title;
  document.getElementById('dilemma-desc').textContent = currentEvent.desc;

  const choicesContainer = document.getElementById('dilemma-choices');
  choicesContainer.innerHTML = '';

  currentEvent.choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className = "w-full p-4 rounded-2xl border border-slate-200/80 bg-white hover:bg-indigo-50 hover:border-indigo-300 text-left transition-all font-semibold text-xs sm:text-sm text-slate-800 flex justify-between items-center group shadow-xs active:scale-[0.99]";
    
    let impacts = [];
    if(choice.money !== 0) impacts.push(choice.money > 0 ? `+R$${choice.money}` : `-R$${Math.abs(choice.money)}`);
    if(choice.grades !== 0) impacts.push(`Nota ${choice.grades > 0 ? '+' : ''}${choice.grades}`);
    
    const impactsText = impacts.length > 0 ? `<span class="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-md text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700">${impacts.join(' | ')}</span>` : '';

    btn.innerHTML = `
      <span class="pr-2">${choice.text}</span> 
      <div class="flex items-center space-x-2 shrink-0">
        ${impactsText}
        <i class="fa-solid fa-arrow-right text-slate-300 group-hover:text-indigo-600 transition-all"></i>
      </div>`;
    btn.onclick = () => makeChoice(choice);
    choicesContainer.appendChild(btn);
  });
}

function makeChoice(choice) {
  gameState.money += choice.money;
  gameState.grades = Math.max(0, Math.min(100, gameState.grades + choice.grades));
  gameState.mental = Math.max(0, Math.min(100, gameState.mental + choice.mental));
  gameState.energy = Math.max(0, Math.min(100, gameState.energy + choice.energy));

  gameState.month++;
  if(gameState.month <= gameState.maxMonths) {
    startMonthCycle();
  } else {
    renderDilemma();
  }
}

function quickRest() {
  if (gameState.energy >= 95) return;
  gameState.energy = Math.min(100, gameState.energy + 20);
  gameState.mental = Math.min(100, gameState.mental + 10);
  gameState.grades = Math.max(0, gameState.grades - 3);
  updateStatsUI();
}

function quickEnergyBoost() {
  if (gameState.money < 15) return;
  gameState.money -= 15;
  gameState.energy = Math.min(100, gameState.energy + 25);
  gameState.mental = Math.max(0, gameState.mental - 5);
  updateStatsUI();
}

function updateStatsUI() {
  document.getElementById('stat-money').textContent = 'R$ ' + gameState.money.toLocaleString('pt-BR');
  document.getElementById('stat-grades').textContent = gameState.grades + '/100';
  document.getElementById('stat-mental').textContent = gameState.mental + '/100';
  document.getElementById('stat-energy').textContent = gameState.energy + '/100';
}

function endGame(isVictory, message) {
  document.getElementById('game-play-screen').classList.add('hidden');
  const overScreen = document.getElementById('game-over-screen');
  overScreen.classList.remove('hidden');

  const icon = document.getElementById('game-over-icon');
  const title = document.getElementById('game-over-title');
  const desc = document.getElementById('game-over-desc');
  const archetypeEl = document.getElementById('game-over-archetype');

  if(isVictory) {
    icon.textContent = "🏆";
    icon.className = "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 bg-emerald-100 text-emerald-600 glow-emerald";
    title.textContent = "Semestre Aprovado!";
    
    let profile = "Equilibrado Versátil ⚖️";
    if (gameState.money > 1500) {
      profile = "Mestre Mão de Vaca 💰";
      unlockBadge('poupador');
    }
    if (gameState.grades >= 80 && gameState.mental >= 70) unlockBadge('survivor');

    archetypeEl.textContent = `Perfil Final: ${profile}`;
  } else {
    icon.textContent = "⚠️";
    icon.className = "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 bg-rose-100 text-rose-600";
    title.textContent = "Semestre Interrompido";
    archetypeEl.textContent = "";
  }
  desc.textContent = message;
}

function resetGame() {
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('game-setup-screen').classList.remove('hidden');
}

// ==========================================
// CALCULADORA FINANCEIRA
// ==========================================

function calculateBudget() {
  const incAllowance = parseFloat(document.getElementById('calc-inc-allowance').value) || 0;
  const incJob = parseFloat(document.getElementById('calc-inc-job').value) || 0;
  const incExtra = parseFloat(document.getElementById('calc-inc-extra').value) || 0;
  const totalInc = incAllowance + incJob + incExtra;

  const expRent = parseFloat(document.getElementById('calc-exp-rent').value) || 0;
  const expFood = parseFloat(document.getElementById('calc-exp-food').value) || 0;
  const expTransport = parseFloat(document.getElementById('calc-exp-transport').value) || 0;
  const expBills = parseFloat(document.getElementById('calc-exp-bills').value) || 0;
  const totalNeeds = expRent + expFood + expTransport + expBills;

  const expLeisure = parseFloat(document.getElementById('calc-exp-leisure').value) || 0;
  const expStudy = parseFloat(document.getElementById('calc-exp-study').value) || 0;
  const expSubs = parseFloat(document.getElementById('calc-exp-subs').value) || 0;
  const totalWants = expLeisure + expStudy + expSubs;

  const totalExp = totalNeeds + totalWants;
  const balance = totalInc - totalExp;

  document.getElementById('calc-total-inc').textContent = 'R$ ' + totalInc.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  document.getElementById('calc-total-exp').textContent = 'R$ ' + totalExp.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  const balEl = document.getElementById('calc-balance');
  balEl.textContent = (balance >= 0 ? '+R$ ' : '-R$ ') + Math.abs(balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  balEl.className = "text-xl sm:text-2xl font-black " + (balance >= 0 ? "text-emerald-600" : "text-rose-600");

  const daysInMonth = 30;
  const remainingForDaily = Math.max(0, totalInc - totalNeeds);
  const dailyLimit = remainingForDaily / daysInMonth;
  
  const dailyEl = document.getElementById('calc-daily-limit');
  if (dailyEl) {
    dailyEl.textContent = 'R$ ' + dailyLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' / dia';
  }

  const pctNeeds = totalInc > 0 ? (totalNeeds / totalInc) * 100 : 0;
  const pctWants = totalInc > 0 ? (totalWants / totalInc) * 100 : 0;
  const pctSavings = totalInc > 0 ? (balance / totalInc) * 100 : 0;

  document.getElementById('bar-needs').style.width = Math.min(100, pctNeeds) + '%';
  document.getElementById('bar-wants').style.width = Math.min(100, pctWants) + '%';
  document.getElementById('bar-savings').style.width = Math.max(0, Math.min(100, pctSavings)) + '%';

  document.getElementById('pct-needs-text').textContent = `${pctNeeds.toFixed(0)}% (Ideal: 50%)`;
  document.getElementById('pct-wants-text').textContent = `${pctWants.toFixed(0)}% (Ideal: 30%)`;
  document.getElementById('pct-savings-text').textContent = `${pctSavings > 0 ? pctSavings.toFixed(0) : 0}% (Ideal: 20%)`;

  const feedbackEl = document.getElementById('calc-feedback');
  if (totalInc === 0) {
    feedbackEl.className = "p-4 rounded-2xl border text-xs bg-slate-100 border-slate-200 text-slate-700 font-medium";
    feedbackEl.innerHTML = "💡 Preencha suas receitas acima para visualizar o diagnóstico.";
  } else if (balance < 0) {
    feedbackEl.className = "p-4 rounded-2xl border text-xs leading-relaxed bg-rose-50 border-rose-200 text-rose-900 font-medium";
    feedbackEl.innerHTML = `🚨 <strong>Alerta: Deficit de R$ ${Math.abs(balance).toFixed(2)}</strong>. Seus gastos excedem a renda mensal. Reduza despesas extras.`;
  } else {
    feedbackEl.className = "p-4 rounded-2xl border text-xs leading-relaxed bg-emerald-50 border-emerald-200 text-emerald-900 font-medium";
    feedbackEl.innerHTML = `🎉 <strong>Orçamento Equilibrado!</strong> Sobram R$ ${balance.toFixed(2)} por mês. Guarde uma parte na sua Reserva de Emergência.`;
    unlockBadge('reserva');
  }
}

// ==========================================
// QUIZ FINANCEIRO
// ==========================================

const quizQuestions = [
  { q: "Qual é a porcentagem sugerida para gastos com lazer na regra 50/30/20?", options: ["10%", "30%", "50%", "80%"], answer: 1 },
  { q: "O que é considerado um custo fixo no orçamento?", options: ["Jantares fora", "Roupas novas", "Aluguel da moradia", "Cinema"], answer: 2 },
  { q: "Qual o risco de pagar apenas o valor mínimo do cartão?", options: ["Frete grátis", "Juros altos do crédito rotativo", "Sua conta é cancelada", "Ganha cashback"], answer: 1 },
  { q: "Qual a melhor prática para economizar em livros da faculdade?", options: ["Comprar novos de luxo", "Usar a biblioteca e acervos digitais", "Imprimir em papel fotográfico", "Comprar edições duplicadas"], answer: 1 },
  { q: "Para que serve a Reserva de Emergência?", options: ["Para gastar em jogos", "Para imprevistos como remédios ou reparos", "Para viagens de última hora", "Para compras de impulso"], answer: 1 }
];

let currentQuizIndex = 0;
let quizScore = 0;

function loadQuizQuestion() {
  if(currentQuizIndex >= quizQuestions.length) {
    showQuizResults();
    return;
  }

  const q = quizQuestions[currentQuizIndex];
  document.getElementById('quiz-progress').textContent = `Pergunta ${currentQuizIndex + 1} de ${quizQuestions.length}`;
  document.getElementById('quiz-score-tracker').textContent = `Pontuação: ${quizScore} pts`;
  document.getElementById('quiz-question').textContent = q.q;

  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';
  document.getElementById('quiz-next-btn').classList.add('hidden');

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = "w-full p-4 rounded-2xl border border-slate-200 bg-white hover:bg-indigo-50 hover:border-indigo-200 text-left transition-all font-semibold text-xs sm:text-sm text-slate-800 shadow-xs active:scale-[0.99]";
    btn.textContent = opt;
    btn.onclick = () => selectQuizAnswer(idx, btn);
    optionsContainer.appendChild(btn);
  });
}

function selectQuizAnswer(selectedIdx, btnElement) {
  const q = quizQuestions[currentQuizIndex];
  const allBtns = document.getElementById('quiz-options').children;

  for(let b of allBtns) b.disabled = true;

  if(selectedIdx === q.answer) {
    btnElement.className = "w-full p-4 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm text-left shadow-xs";
    quizScore += 20;
  } else {
    btnElement.className = "w-full p-4 rounded-2xl border border-rose-300 bg-rose-50 text-rose-800 font-bold text-xs sm:text-sm text-left shadow-xs";
    allBtns[q.answer].className = "w-full p-4 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm text-left shadow-xs";
  }

  document.getElementById('quiz-score-tracker').textContent = `Pontuação: ${quizScore} pts`;
  document.getElementById('quiz-next-btn').classList.remove('hidden');
}

function nextQuizQuestion() {
  currentQuizIndex++;
  loadQuizQuestion();
}

function showQuizResults() {
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('quiz-result-screen').classList.remove('hidden');
  document.getElementById('quiz-final-score-text').textContent = `Pontuação final: ${quizScore} / 100 pts`;

  if (quizScore === 100) unlockBadge('quizMaster');
}

function restartQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  document.getElementById('quiz-result-screen').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  loadQuizQuestion();
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

window.onload = function() {
  renderBadgesUI();
  calculateBudget();
  loadQuizQuestion();
};