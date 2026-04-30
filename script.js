let vida1 = 150 // Vida inciial do jogador 1
let vida2 = 150 // Vida inicial do jogador 2

let jogoFinalizado = false;
let modoDesempate = false;

let jogadorAtual = 1; // O jogo começa do jogador 1

let respostaCorreta; //Variavel que vai acumular a respostas

let rodada = 1; // 1=fácil, 2=médio, 3=difícil
let perguntaAtual = 0; // Variavel para guardar as perguntas
let dano = 0; // Variavel dano

let perguntasPorRodada = 0; // Variavel para guardar as perguntas por rodada


function mostrarMensagemRodada() { // mostrar mensagem de qual rodada é
    let msg = "";

    if (rodada === 1) {
        msg = "🟢 Rodada 1 - FÁCIL!";
    } else if (rodada === 2) {
        msg = "🟡 Rodada 2 - MÉDIO!";
    } else {
        msg = "🔴 Rodada 3 - DIFÍCIL!";
    }

    let elemento = document.getElementById("mensagem-rodada");
    elemento.textContent = msg;

    // some depois de 3 segundos
    setTimeout(() => {
        elemento.textContent = "";
    }, 3000);
}

function modoDesempateAtacar(resposta) { // questão extra de para desempate 

    if (resposta === respostaCorreta) {

        if (jogadorAtual === 1) {
            vida2 = 0;
            alert("Jogador 1 venceu!");
        } else {
            vida1 = 0;
            alert("Jogador 2 venceu!");
        }

        jogoFinalizado = true;
        return;
    } else {
        alert("Errou! Passa a vez.");
    }

    jogadorAtual = (jogadorAtual === 1) ? 2 : 1;

    atualizarTurno();
    gerarPergunta();
}


function iniciarJogo() 
{
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("jogo").style.display = "block";

    rodada = 1; // garante que começa na rodada 1
    perguntaAtual = 0;

    mostrarMensagemRodada(); //  aqui mostra a rodada 1

    gerarPergunta();
    atualizarTurno();
}

function atualizarTurno() // Função para atualizar o turno
{
    document.getElementById("turno").textContent = "Vez do Jogador " + jogadorAtual;
}

function gerarPergunta() {
    // Gera um numero aleatorio de 0 a 9
    let x = Math.floor(Math.random() * 10);

    // controla nível
    let tipo = Math.floor(Math.random() * 2);

    let pergunta = "";

    // FÁCIL (rodada 1)
    if (rodada === 1) {
        dano = 25;
        perguntasPorRodada = 3;

        if (tipo === 0) {
            pergunta = "f(x) = x + 2, x = " + x;
            respostaCorreta = x + 2;
        } else {
            pergunta = "f(x) = x - 1, x = " + x;
            respostaCorreta = x - 1;
        }
    }

    // MÉDIO (rodada 2)
    else if (rodada === 2) {
        dano = 35;
        perguntasPorRodada = 3;

        if (tipo === 0) {
            pergunta = "f(x) = 2x + 3, x = " + x;
            respostaCorreta = 2 * x + 3;
        } else {
            pergunta = "f(x) = x² - 2, x = " + x;
            respostaCorreta = (x * x) - 2;
        }
    }

    // DIFÍCIL (rodada 3)
    else {
        dano = 50;
        perguntasPorRodada = 2;

        if (tipo === 0) {
            pergunta = "f(x) = x² + x + 1, x = " + x;
            respostaCorreta = (x * x) + x + 1;
        } else {
            pergunta = "f(x) = 3x² - x, x = " + x;
            respostaCorreta = (3 * x * x) - x;
        }
    }

    document.getElementById("pergunta").textContent = pergunta;

}

function mostrarMensagemDesempate() {
    let msg = document.getElementById("mensagem-rodada");

    msg.textContent = "⚔️ DESAFIO FINAL! Quem acertar vence!";
    
    msg.style.color = "red";
    msg.style.fontWeight = "bold";

    setTimeout(() => {
        msg.textContent = "";
    }, 2000);
}


function atacar() {

     // bloqueia se o jogo já acabou
    if (jogoFinalizado) return;

    let resposta = Number(document.getElementById("resposta").value);

      // MODO DESEMPATE
    if (modoDesempate) {

        if (resposta === respostaCorreta) {

            if (jogadorAtual === 1) {
                vida2 = 0;
                alert(" Jogador 1 venceu no desempate!");
            } else {
                vida1 = 0;
                alert(" Jogador 2 venceu no desempate!");
            }

            jogoFinalizado = true;

            document.getElementById("vida1").textContent = vida1;
            document.getElementById("vida2").textContent = vida2;

            return;
        } else {
            alert("Errou! Passa a vez.");
        }

        // troca jogador no desempate
        jogadorAtual = (jogadorAtual === 1) ? 2 : 1;

        atualizarTurno();
        gerarPergunta();
        document.getElementById("resposta").value = "";
        return;
    }

    if (resposta === respostaCorreta) {
        alert("Acertou! Dano: " + dano);

        if (jogadorAtual === 1) {
            vida2 -= dano;
        } else {
            vida1 -= dano;
        }

        document.getElementById("vida1").textContent = vida1;
        document.getElementById("vida2").textContent = vida2;
    } else {
        alert("Errou!");
    }

    // aumenta contador de perguntas respondidas
    perguntaAtual++;

    // troca pergunta dentro da rodada
    if (perguntaAtual >= perguntasPorRodada) {
        rodada++; // próxima dificuldade
        perguntaAtual = 0;
        mostrarMensagemRodada();
    }

    // reinicia se acabar tudo
    if (rodada > 3) 
    {
        if (vida1 > 0 && vida2 > 0) {
        modoDesempate = true;
        alert("DESEMPATE!");
        
        mostrarMensagemDesempate()
    }

        rodada = 1;
    }

    // alterna jogador
    if (jogadorAtual === 1) {
        jogadorAtual = 2;
    } else {
        jogadorAtual = 1;
    }

    // atualiza texto na tela
    atualizarTurno();

    gerarPergunta();
    document.getElementById("resposta").value = "";
}

function reiniciarJogo() {
    vida1 = 150;
    vida2 = 150;
    rodada = 1;
    perguntaAtual = 0;
    jogadorAtual = 1;
    jogoFinalizado = false;
    modoDesempate = false;

    atualizarVida();
    atualizarTurno();
    gerarPergunta();
}

gerarPergunta();
atualizarTurno()
