// ==========================
// 🔴 VARIÁVEIS GLOBAIS
// ==========================

// Vida inicial dos jogadores
let vida1 = 150;
let vida2 = 150;

// Tempo do cronômetro
let tempo = 30;

// Intervalo do timer
let intervalo;

// Guarda quem apertou primeiro (ganha o bônus)
let primeiro = null;

// Elemento de log na tela
let log;

// Controle do jogo
let jogoAtivo = true;

// Perguntas dos jogadores
let q1, q2;

// Controle de rodada
let rodada = 1;

// Contador de respostas por jogador
let respostasJ1 = 0;
let respostasJ2 = 0;

// Controle se o jogo começou
let jogoIniciado = false;


// Só pega o log depois que a tela carregar
window.onload = function() {
  log = document.getElementById("log"); 
};


// ==========================
// 🧠 GERAR PERGUNTA
// ==========================

function gerarPergunta() {

  let x = Math.floor(Math.random() * 10);

  let tipo = rodada - 1;

  let pergunta, resposta, dano;

  if (tipo === 0) {
    pergunta = `f(x) = 2x + 3, x = ${x}`;
    resposta = 2 * x + 3;
    dano = 20;

  } else if (tipo === 1) {
    pergunta = `f(x) = x² - 1, x = ${x}`;
    resposta = (x * x) - 1;
    dano = 30;

  } else {
    pergunta = `f(x) = 3x² + 2x - 5, x = ${x}`;
    resposta = (3 * x * x) + (2 * x) - 5;
    dano = 50;
  }

  return { pergunta, resposta, dano };
}


// ==========================
// 🔄 NOVA RODADA
// ==========================

function novaRodada() {

  q1 = gerarPergunta();
  q2 = gerarPergunta();

  // Reseta prioridade
  primeiro = null;

  // Atualiza perguntas na tela
  document.getElementById("pergunta1").innerText = q1.pergunta;
  document.getElementById("pergunta2").innerText = q2.pergunta;

  // Limpa respostas
  document.getElementById("resposta1").value = "";
  document.getElementById("resposta2").value = "";

  if (jogoIniciado) {
    log.textContent = "📢 Nova pergunta!";
  }

  document.getElementById("rodada").innerText = "Rodada " + rodada;
}


// ==========================
// ⚡ PRESSIONAR (GANHAR BÔNUS)
// ==========================

function pressionar(jogador) {

  // Se alguém já apertou, não deixa outro pegar
  if (primeiro !== null) return;

  // Define quem ganhou o bônus
  primeiro = jogador;

  log.textContent = `⚡ Jogador ${jogador} foi mais rápido!`;

  iniciarTimer();
}


// ==========================
// ⌨️ TECLAS Q e P
// ==========================

document.addEventListener("keydown", function(event) {

  let tecla = event.key.toLowerCase();

  if (tecla === "q") pressionar(1);
  if (tecla === "p") pressionar(2);

});


// ==========================
// ⚔️ RESPONDER
// ==========================

function responder(jogador) {

  if (!jogoAtivo) return;

  // Se ninguém apertou ainda
    if (primeiro === null) {
      log.textContent = "⚡ Aperte Q ou P primeiro!";
      return;}

// Se não for a vez do jogador
    if (primeiro !== jogador) {
      log.textContent = `⏳ Vez do Jogador ${primeiro}`;
      return;}

  // Define bônus por rodada
    let bonus = 0;
    if (rodada === 1) bonus = 10;
    else if (rodada === 2) bonus = 20;
    else bonus = 30;

  // ======================
  // JOGADOR 1
  // ======================
  if (jogador === 1) {

    let r = Number(document.getElementById("resposta1").value);

    if (isNaN(r)) {
      log.textContent = "Digite um número!";
      return;
    }

    if (r === q1.resposta) {

      let danoTotal = q1.dano + bonus;
      vida2 -= danoTotal;

      log.textContent = `💥 J1 causou ${danoTotal} de dano!`;

    } else {

      log.textContent = "❌ J1 errou!";

      let danoTotal = q1.dano + bonus;
      vida1 -= danoTotal;
    }

    respostasJ1++;

  } else {

    // ======================
    // JOGADOR 2
    // ======================

    let r = Number(document.getElementById("resposta2").value);

    if (isNaN(r)) {
      log.textContent = "Digite um número!";
      return;
    }

    if (r === q2.resposta) {

      let danoTotal = q2.dano + bonus;
      vida1 -= danoTotal;

      log.textContent = `💥 J2 causou ${danoTotal} de dano!`;

    } else {

      log.textContent = "❌ J2 errou!";

      let danoTotal = q2.dano + bonus;
      vida2 -= danoTotal;
    }

    respostasJ2++;
  }

  // Atualiza vida
  atualizarVida();

  // Reseta prioridade
  primeiro = null;

  // ======================
  // 🔄 TROCA DE RODADA
  // ======================

  // Se ambos responderam 3 vezes
  if (respostasJ1 >= 3 && respostasJ2 >= 3) {

    rodada++;

    respostasJ1 = 0;
    respostasJ2 = 0;

    if (rodada > 3) {
      log.textContent = "🏆 Fim do jogo!";
      return;
    }

    log.textContent = `⚔ Rodada ${rodada}!`;
  }

  novaRodada();
}


// ==========================
// ❤️ ATUALIZAR VIDA
// ==========================

function atualizarVida() {

  // Impede valores negativos
  vida1 = Math.max(0, vida1);
  vida2 = Math.max(0, vida2);

  // Atualiza número
  document.getElementById("vida1").innerText = vida1;
  document.getElementById("vida2").innerText = vida2;

  // 🔥 ATUALIZA A BARRA
  document.getElementById("barra1").style.width = (vida1 / 150 * 100) + "%";
  document.getElementById("barra2").style.width = (vida2 / 150 * 100) + "%";
}


// ==========================
// ⏱️ TIMER
// ==========================

function iniciarTimer() {

  clearInterval(intervalo);

  tempo = 30;

  intervalo = setInterval(() => {

    tempo--;

    document.getElementById("timer").innerText = tempo;

    if (tempo <= 0) {

      clearInterval(intervalo);

      vida1 -= 15;
      vida2 -= 15;

      atualizarVida();

      novaRodada();
    }

  }, 1000);
}


// ==========================
// 🎮 INICIAR JOGO
// ==========================

function iniciarJogo() {

  document.getElementById("tela-inicial").style.display = "none";
  document.getElementById("jogo").style.display = "block";

  vida1 = 150;
  vida2 = 150;

  respostasJ1 = 0;
  respostasJ2 = 0;

  atualizarVida();

  novaRodada();

  jogoIniciado = true;
}