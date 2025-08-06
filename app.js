let listaDeNumerosSorteados = [];
let numeroDeSorteioLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
console.log(numeroSecreto);

// função pra mexer com o dom
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// função de exibir uma mensagem padrão
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', 'Escolha um numero de 1 a 10');
}

exibirMensagemInicial();

// faz uma interação com o HTML. com o HTML chamando o javascript ao usuário interagir com a pagina
// utiliza de função para verificar se chute é igual ao numero secreto, compara os dois e retorna uma info
function verificarChute() {
    let chute = document.querySelector('input').value;
    // o .value tá puxando só o valor digitado no campo do input
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você ganhou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = (`Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`);
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor que o chute');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior que o chute');
        }
        tentativas++;
        limparCampo();
    }
}

// função de limpar o campo do input
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// função que vai gerar um numero aleatorio e vai colocá-lo numa lista para nao repetir
function gerarNumeroAleatorio() {
    let quantiaNumerosNaLista = listaDeNumerosSorteados.length
    let numeroEscolhido = parseInt(Math.random() * numeroDeSorteioLimite + 1);
    if (quantiaNumerosNaLista == numeroDeSorteioLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
   }
}

// função pro botão de reiniciar o jogo. desabilita o botao tbm
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}