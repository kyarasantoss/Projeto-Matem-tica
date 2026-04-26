let vida1 = 300
let vida2 = 300

let jogadorAtual = 1;

let respostaCorreta;

function gerarPergunta() {
    let a = Math.floor(Math.random() * 10);
     let b = Math.floor(Math.random() * 10);
    
     respostaCorreta = a + b;

     document.getElementById("pergunta")

}

gerarPergunta()

function Atacar(){
    let resposta = Number(document.getElementById("resposta").value)

    if (resposta === respostaCorreta){
        let dano;

        if (dificuldade === 1){
            dano = 25;
        } else if (dificuldade === 2) {
            dano = 30;
        } else if (dificuldade === 3){
             dano = 50;
        }
        

        if (jogadorAtual === 1){
            vida2 -= dano;
            alert ("Jogador 1 acertou e causou " + dano + " de dano!");
        } else {
            vida1 -= dano;
            alert ("O jogador 1 errou e levou " + dano + " de dano!");
        }  else {
            alert ("Errou!");
        }
        
    }
}