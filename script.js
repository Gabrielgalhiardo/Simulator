var vida = 100;
var vidaAtualizada = 100;
var pedregulho = 0;
var bonusPedra = 30;
var dano = 1;
var valorUpgradeDano = 20;
var valorEvoluirUpgrade = 10;
var valorPedraUpgrade = 300;

var nivelDano = 1;
var multiplicadorDaPicareta = 1;

var numeroDeRenacimentos = 0;
var pontosDeRenacimento = 0;
var custoRenacimento = 100000;

var animacaoLigada = true;
var somLigado = true;

var boostPicareta = 1;

// Elementos de áudio
var somStoneHit = new Audio('musicas/StoneHit.mp3');
var somStoneBroke = new Audio('musicas/StoneBroke.mp3');

// Configurar volumes (opcional)
somStoneHit.volume = 0.5;
somStoneBroke.volume = 0.5;

// ==================================================
// SISTEMA DE NOTIFICAÇÕES
// ==================================================
function mostrarNotificacao(mensagem, tipo = 'aviso') {
    // tipo pode ser: 'sucesso', 'erro', 'aviso'
    const container = document.getElementById('notificacoesContainer');
    if (!container) return;
    
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.textContent = mensagem;
    
    container.appendChild(notificacao);
    
    // Remove a notificação após a animação (3 segundos)
    setTimeout(() => {
        if (notificacao.parentNode) {
            notificacao.parentNode.removeChild(notificacao);
        }
    }, 3000);
}

// ==================================================
// NOVAS FUNÇÕES DE SAVE / LOAD
// ==================================================

function saveGame() {
    let saveObject = {
        vida: vida,
        pedregulho: pedregulho,
        bonusPedra: bonusPedra,
        dano: dano,
        valorUpgradeDano: valorUpgradeDano,
        valorEvoluirUpgrade: valorEvoluirUpgrade,
        valorPedraUpgrade: valorPedraUpgrade,
        nivelDano: nivelDano,
        multiplicadorDaPicareta: multiplicadorDaPicareta,
        numeroDeRenacimentos: numeroDeRenacimentos,
        pontosDeRenacimento: pontosDeRenacimento,
        custoRenacimento: custoRenacimento,
        animacaoLigada: animacaoLigada,
        somLigado: somLigado,
        boostPicareta: boostPicareta,
        picaretaEquipada: picaretaEquipada,
        picaretas: picaretas,
        pedraEquipada: pedraEquipada,
        fundoEquipado: fundoEquipado,
        pedras: pedras,
        fundos: fundos
        // Não precisamos salvar vidaAtualizada, ela será resetada para a 'vida' máxima no load
    };

    localStorage.setItem('minerGameSave', JSON.stringify(saveObject));
    // console.log("Jogo Salvo!"); // Descomente para testar
}

function loadGame() {
    let savedData = localStorage.getItem('minerGameSave');

    if (savedData) {
        let saveObject = JSON.parse(savedData);

        // O '??' (operador de coalescência nula) garante que, se uma variável não
        // existir no save (por ser uma nova versão), ela use o valor padrão.
        vida = saveObject.vida ?? 100;
        pedregulho = saveObject.pedregulho ?? 0;
        bonusPedra = saveObject.bonusPedra ?? 30;
        dano = saveObject.dano ?? 1;
        valorUpgradeDano = saveObject.valorUpgradeDano ?? 20;
        valorEvoluirUpgrade = saveObject.valorEvoluirUpgrade ?? 10;
        valorPedraUpgrade = saveObject.valorPedraUpgrade ?? 300;
        nivelDano = saveObject.nivelDano ?? 1;
        multiplicadorDaPicareta = saveObject.multiplicadorDaPicareta ?? 1;
        numeroDeRenacimentos = saveObject.numeroDeRenacimentos ?? 0;
        pontosDeRenacimento = saveObject.pontosDeRenacimento ?? 0;
        custoRenacimento = saveObject.custoRenacimento ?? 100000;
        animacaoLigada = saveObject.animacaoLigada ?? true;
        somLigado = saveObject.somLigado ?? true;
        boostPicareta = saveObject.boostPicareta ?? 1;
        picaretaEquipada = saveObject.picaretaEquipada ?? 0;
        picaretas = saveObject.picaretas ?? [false, false, false, false];
        pedraEquipada = saveObject.pedraEquipada ?? 0;
        fundoEquipado = saveObject.fundoEquipado ?? 0;
        // Garantir que apenas a primeira pedra (padrão) venha desbloqueada
        // Se não houver save, inicializar todas como false
        if(saveObject.pedras){
            pedras = saveObject.pedras;
        } else {
            // Primeiro jogo: todas as pedras bloqueadas (exceto a padrão que sempre está disponível)
            pedras = [false, false, false, false];
        }
        fundos = saveObject.fundos ?? [false, false, false, false];
        
        // Aplicar itens equipados ao carregar (0 = padrão, também precisa ser aplicado)
        // Usar setTimeout para garantir que as telas foram carregadas
        setTimeout(() => {
            if(picaretaEquipada >= 0){
                equiparPicareta(picaretaEquipada);
            }
            if(pedraEquipada >= 0){
                equiparPedra(pedraEquipada);
            }
            if(fundoEquipado >= 0){
                equiparFundo(fundoEquipado);
            }
        }, 500);

        // Reseta a vida atual para a vida máxima salva
        vidaAtualizada = vida;
        
        // Atualiza os checkboxes de configuração
        let animacaoCheckbox = document.getElementById("animacaoLigada");
        if (animacaoCheckbox) {
            animacaoCheckbox.checked = animacaoLigada;
        }
        
        let somCheckbox = document.getElementById("somLigado");
        if (somCheckbox) {
            somCheckbox.checked = somLigado;
        }

        console.log("Jogo Carregado!");
    } else {
        console.log("Nenhum save encontrado. Começando novo jogo.");
    }
}

function resetGame() {
    if (confirm("Você tem certeza que quer apagar todo o seu progresso? Isso não pode ser desfeito!")) {
        localStorage.removeItem('minerGameSave');
        location.reload(); // Recarrega a página para começar do zero
    }
}

// ==================================================
// FIM DAS FUNÇÕES DE SAVE / LOAD
// ==================================================


function minerar(){
    let picareta = document.getElementById("picareta");
    let pedra = document.getElementById("pedra");
    let botao = document.getElementById("botaoMinerar");


    //animação da picareta
    if(animacaoLigada){
        picareta.style.animation = 'none';
        void picareta.offsetWidth;
        picareta.style.animation = `minerar 0.5s linear 1`;
    }


    //disabilitando o botão
    botao.disabled = true;
    setTimeout(() => {
    botao.disabled = false;
  }, 1000); // Ajustado para 1000ms (1 segundo) para ser mais razoável

    //tirando vida da pedra
    vidaAtualizada = vidaAtualizada - dano;
    
    //ganhando pedras
    if(vidaAtualizada <= 0){
        vidaAtualizada = vida;

        // Ganho matatando a Pedra
        let multiplicadorPedraAtual = (pedraEquipada > 0) ? multiplicadoresPedra[pedraEquipada - 1] : 1;
        let multiplicadorPicaretaAtual = (picaretaEquipada > 0) ? parseFloat(multiplicadorDaPicareta) : 1;
        pedregulho += Math.floor(bonusPedra * multiplicadorPicaretaAtual * multiplicadorPedraAtual);

        // Tocar som de pedra quebrando
        if(somLigado){
            somStoneBroke.currentTime = 0; // Reinicia o áudio caso já esteja tocando
            somStoneBroke.play().catch(e => console.log("Erro ao tocar som:", e));
        }

        if(animacaoLigada){
            pedra.style.animation = 'none';
            void pedra.offsetWidth;
            pedra.style.animation = `pedraMorre 0.7s linear 1 0.4s`;  
        }
    }else{
        // Ganho sem matar a Pedra
        let multiplicadorPedraAtual = (pedraEquipada > 0) ? multiplicadoresPedra[pedraEquipada - 1] : 1;
        let multiplicadorPicaretaAtual = (picaretaEquipada > 0) ? parseFloat(multiplicadorDaPicareta) : 1;
        pedregulho += Math.floor(dano * multiplicadorPicaretaAtual * multiplicadorPedraAtual); 
        
        // Tocar som de hit na pedra
        if(somLigado){
            somStoneHit.currentTime = 0; // Reinicia o áudio caso já esteja tocando
            somStoneHit.play().catch(e => console.log("Erro ao tocar som:", e));
        }
        
        if(animacaoLigada){
            pedra.style.animation = 'none';
            void pedra.offsetWidth;
            pedra.style.animation = `pedraHit 0.7s linear 1 0.4s`;      
        }
    }

}

// Upgrades

function melhoriaDano(){

    if(pedregulho >= valorUpgradeDano){
            pedregulho = pedregulho - valorUpgradeDano;
            dano = dano + 1;
            nivelDano += 1;
            valorUpgradeDano = Math.floor(20 * (1.18 ** (nivelDano - 1)));
    } else {
        // Mostrar aviso quando não tiver dinheiro suficiente
        mostrarNotificacao(`Você precisa de ${valorUpgradeDano} pedras para melhorar o dano!`, 'erro');
    }

}

function melhoriaPicareta(){

    if(dano >= valorEvoluirUpgrade){
        dano = 1;
        nivelDano = 1;
        // statusDano.innerText = `Dano: ${dano}`; // Isso causará erro, statusDano é definido em atualizarStatus

        multiplicadorDaPicareta = (multiplicadorDaPicareta * 1.6).toFixed(2);
        valorEvoluirUpgrade = Math.floor(valorEvoluirUpgrade * 1.45);
        valorUpgradeDano = Math.floor(20 * (1.5 ** (nivelDano - 1)));
    } else {
        // Mostrar aviso quando não tiver dano suficiente
        mostrarNotificacao(`Você precisa de ${valorEvoluirUpgrade} de dano para evoluir a picareta!`, 'erro');
    }

}

function melhoriaPedra(){
    if(pedregulho >= valorPedraUpgrade){
        pedregulho = pedregulho - valorPedraUpgrade;
        vida = Math.floor(vida * 1.4);
        vidaAtualizada = vida;
        valorPedraUpgrade = Math.floor(valorPedraUpgrade * 1.70);

        bonusPedra = Math.floor(bonusPedra * 2);
    } else {
        // Mostrar aviso quando não tiver dinheiro suficiente
        mostrarNotificacao(`Você precisa de ${valorPedraUpgrade} pedras para melhorar a pedra!`, 'erro');
    }
}

function renacer(){
    if(pedregulho >= custoRenacimento){
        custoRenacimento = Math.floor(custoRenacimento * 2);

        vida = 100;
        vidaAtualizada = 100;
        pedregulho = 0;
        bonusPedra = 30;
        dano = 1;
        valorUpgradeDano = 20;
        valorEvoluirUpgrade = 10;
        valorPedraUpgrade = 300;

        nivelDano = 1;
        
        // Salvar qual picareta estava equipada antes do renascimento
        let picaretaEquipadaAntes = picaretaEquipada;
        
        // Resetar pedras - apenas a primeira (padrão) fica disponível
        pedras = [false, false, false, false];
        pedraEquipada = 0; // Equipar pedra padrão
        
        pontosDeRenacimento += 1;
        numeroDeRenacimentos += 1;
        
        // Reequipar a picareta que estava equipada antes do renascimento
        // As picaretas compradas permanecem desbloqueadas após renascimento
        setTimeout(() => {
            // Se a picareta estava desbloqueada antes, reequipá-la
            if(picaretaEquipadaAntes === 0 || (picaretaEquipadaAntes > 0 && picaretas[picaretaEquipadaAntes - 1])){
                equiparPicareta(picaretaEquipadaAntes);
            } else {
                // Se não estava desbloqueada, equipar a padrão
                equiparPicareta(0);
            }
            
            // Equipar a pedra padrão após renascer
            equiparPedra(0);
        }, 100);
        
        saveGame(); // Salvar o estado após resetar pedras
        telaRenacer(); // Isso fechará a tela após renascer
    } else {
        // Mostrar aviso quando não tiver dinheiro suficiente
        mostrarNotificacao(`Você precisa de ${custoRenacimento} pedras para renascer!`, 'erro');
    }
}

var picaretaEquipada = 0;
var pedraEquipada = 0;
var fundoEquipado = 0;

var codigoPicareta = -1;
var codigoPedra = -1;
var codigoFundo = -1;
var tipoItem = ""; // "picareta", "pedra", "fundo"

var picaretas = [false, false, false, false]; // 4 picaretas (índices 0-3 para picaretas 2-5)
var pedras = [false, false, false, false]; // 4 pedras (índices 0-3 para pedras 2-5)
var fundos = [false, false, false, false]; // 4 fundos (índices 0-3 para fundos 2-5)

// Multiplicadores e benefícios
var multiplicadoresPicareta = [2, 3, 5, 10]; // Multiplicadores para picaretas 2, 3, 4, 5
var multiplicadoresPedra = [1.5, 2, 3, 5]; // Multiplicadores de ganho para pedras 2, 3, 4, 5
var bonusPedraBase = 30; // Bonus base ao quebrar pedra

// Função para obter elementos do DOM dinamicamente
function obterElementosItemSelecionado(){
    return {
        titulo: document.getElementById("tituloItemSelecionado"),
        foto: document.getElementById("imagemItemSelecionado"),
        preco: document.getElementById("precoItemSelecionado"),
        descricao: document.getElementById("descricaoItemSelecionado"),
        comprar: document.getElementById("botaoComprar")
    };
}

// Funções para abrir menu de compra de picaretas
function abrirMenuCompraPicareta1(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "picareta";
    codigoPicareta = -1; // -1 para picareta padrão
    let custo = 0; // Gratuita (padrão)
    
    elementos.titulo.innerText = "Picareta 1 (Padrão)";
    elementos.foto.src = "imagens/picaretas/picareta1.png";
    elementos.preco.innerText = "Gratuita (Item Padrão)";
    elementos.descricao.innerText = "Picareta Básica: Multiplicador padrão de 1x";
    
    // Sempre mostra "Equipar" ou "Equipado" já que é padrão
    if(picaretaEquipada === 0){
        elementos.comprar.innerText = "Equipado";
    } else {
        elementos.comprar.innerText = "Equipar";
    }
}

function abrirMenuCompraPicareta2(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "picareta";
    codigoPicareta = 0;
    let custo = 1;
    
    elementos.titulo.innerText = "Picareta 2";
    elementos.foto.src = "imagens/picaretas/picareta2.png";
    elementos.preco.innerText = `Custo: ${custo} Ponto de Renascimento`;
    elementos.descricao.innerText = `Picareta de Ferro: Multiplica seus ganhos por ${multiplicadoresPicareta[0]}x`;
    
    atualizarBotaoCompra(0, "picareta");
}

function abrirMenuCompraPicareta3(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "picareta";
    codigoPicareta = 1;
    let custo = 2;
    
    elementos.titulo.innerText = "Picareta 3";
    elementos.foto.src = "imagens/picaretas/picareta3.png";
    elementos.preco.innerText = `Custo: ${custo} Pontos de Renascimento`;
    elementos.descricao.innerText = `Picareta de Ouro: Multiplica seus ganhos por ${multiplicadoresPicareta[1]}x`;
    
    atualizarBotaoCompra(1, "picareta");
}

function abrirMenuCompraPicareta4(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "picareta";
    codigoPicareta = 2;
    let custo = 5;
    
    elementos.titulo.innerText = "Picareta 4";
    elementos.foto.src = "imagens/picaretas/picareta4.png";
    elementos.preco.innerText = `Custo: ${custo} Pontos de Renascimento`;
    elementos.descricao.innerText = `Picareta de Diamante: Multiplica seus ganhos por ${multiplicadoresPicareta[2]}x`;
    
    atualizarBotaoCompra(2, "picareta");
}

function abrirMenuCompraPicareta5(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "picareta";
    codigoPicareta = 3;
    let custo = 10;
    
    elementos.titulo.innerText = "Picareta 5";
    elementos.foto.src = "imagens/picaretas/picareta5.png";
    elementos.preco.innerText = `Custo: ${custo} Pontos de Renascimento`;
    elementos.descricao.innerText = `Picareta Lendária: Multiplica seus ganhos por ${multiplicadoresPicareta[3]}x`;
    
    atualizarBotaoCompra(3, "picareta");
}

// Funções para abrir menu de compra de pedras
function abrirMenuCompraPedra1(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "pedra";
    codigoPedra = -1; // -1 para pedra padrão
    let custo = 0; // Gratuita (padrão)
    
    elementos.titulo.innerText = "Pedra 1 (Padrão)";
    elementos.foto.src = "imagens/pedras/pedra1.png";
    elementos.preco.innerText = "Gratuita (Item Padrão)";
    elementos.descricao.innerText = "Pedra Básica: Sem multiplicador adicional";
    
    // Sempre mostra "Equipar" ou "Equipado" já que é padrão
    if(pedraEquipada === 0){
        elementos.comprar.innerText = "Equipado";
    } else {
        elementos.comprar.innerText = "Equipar";
    }
}

function abrirMenuCompraPedra2(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "pedra";
    codigoPedra = 0;
    let custo = 1;
    
    elementos.titulo.innerText = "Pedra 2";
    elementos.foto.src = "imagens/pedras/pedra2.png";
    elementos.preco.innerText = `Custo: ${custo} Ponto de Renascimento`;
    elementos.descricao.innerText = `Pedra Melhorada: Aumenta seus ganhos em ${(multiplicadoresPedra[0] * 100) - 100}%`;
    
    atualizarBotaoCompra(0, "pedra");
}

function abrirMenuCompraPedra3(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "pedra";
    codigoPedra = 1;
    let custo = 2;
    
    elementos.titulo.innerText = "Pedra 3";
    elementos.foto.src = "imagens/pedras/pedra3.png";
    elementos.preco.innerText = `Custo: ${custo} Pontos de Renascimento`;
    elementos.descricao.innerText = `Pedra Rara: Aumenta seus ganhos em ${(multiplicadoresPedra[1] * 100) - 100}%`;
    
    atualizarBotaoCompra(1, "pedra");
}

function abrirMenuCompraPedra4(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "pedra";
    codigoPedra = 2;
    let custo = 5;
    
    elementos.titulo.innerText = "Pedra 4";
    elementos.foto.src = "imagens/pedras/pedra4.png";
    elementos.preco.innerText = `Custo: ${custo} Pontos de Renascimento`;
    elementos.descricao.innerText = `Pedra Épica: Aumenta seus ganhos em ${(multiplicadoresPedra[2] * 100) - 100}%`;
    
    atualizarBotaoCompra(2, "pedra");
}

function abrirMenuCompraPedra5(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "pedra";
    codigoPedra = 3;
    let custo = 10;
    
    elementos.titulo.innerText = "Pedra 5";
    elementos.foto.src = "imagens/pedras/pedra5.png";
    elementos.preco.innerText = `Custo: ${custo} Pontos de Renascimento`;
    elementos.descricao.innerText = `Pedra Lendária: Aumenta seus ganhos em ${(multiplicadoresPedra[3] * 100) - 100}%`;
    
    atualizarBotaoCompra(3, "pedra");
}

// Funções para abrir menu de compra de fundos
function abrirMenuComprarFundo1(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "fundo";
    codigoFundo = -1; // -1 para fundo padrão
    let custo = 0; // Gratuito (padrão)
    
    elementos.titulo.innerText = "Fundo 1 (Padrão)";
    elementos.foto.src = "imagens/fundos/fundo1.png";
    elementos.preco.innerText = "Gratuito (Item Padrão)";
    elementos.descricao.innerText = "Fundo Padrão: Fundo original do jogo";
    
    // Sempre mostra "Equipar" ou "Equipado" já que é padrão
    if(fundoEquipado === 0){
        elementos.comprar.innerText = "Equipado";
    } else {
        elementos.comprar.innerText = "Equipar";
    }
}

function abrirMenuComprarFundo2(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "fundo";
    codigoFundo = 0;
    let custo = 1;
    
    elementos.titulo.innerText = "Fundo 2";
    elementos.foto.src = "imagens/fundos/fundo2.png";
    elementos.preco.innerText = `Custo: ${custo} Ponto de Renascimento`;
    elementos.descricao.innerText = "Fundo Alternativo: Mude a aparência do seu jogo!";
    
    atualizarBotaoCompra(0, "fundo");
}

function abrirMenuComprarFundo3(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "fundo";
    codigoFundo = 1;
    let custo = 2;
    
    elementos.titulo.innerText = "Fundo 3";
    elementos.foto.src = "imagens/fundos/fundo3.png";
    elementos.preco.innerText = `Custo: ${custo} Pontos de Renascimento`;
    elementos.descricao.innerText = "Fundo Alternativo: Mude a aparência do seu jogo!";
    
    atualizarBotaoCompra(1, "fundo");
}

function abrirMenuComprarFundo4(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "fundo";
    codigoFundo = 2;
    let custo = 5;
    
    elementos.titulo.innerText = "Fundo 4";
    elementos.foto.src = "imagens/fundos/fundo4.png";
    elementos.preco.innerText = `Custo: ${custo} Pontos de Renascimento`;
    elementos.descricao.innerText = "Fundo Alternativo: Mude a aparência do seu jogo!";
    
    atualizarBotaoCompra(2, "fundo");
}

function abrirMenuComprarFundo5(){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.titulo || !elementos.foto || !elementos.preco || !elementos.descricao || !elementos.comprar) return;
    
    tipoItem = "fundo";
    codigoFundo = 3;
    let custo = 10;
    
    elementos.titulo.innerText = "Fundo 5";
    elementos.foto.src = "imagens/fundos/fundo5.png";
    elementos.preco.innerText = `Custo: ${custo} Pontos de Renascimento`;
    elementos.descricao.innerText = "Fundo Alternativo: Mude a aparência do seu jogo!";
    
    atualizarBotaoCompra(3, "fundo");
}

// Função auxiliar para atualizar o botão de compra
function atualizarBotaoCompra(indice, tipo){
    let elementos = obterElementosItemSelecionado();
    if(!elementos.comprar) return;
    
    let possui = false;
    let equipado = false;
    
    if(tipo === "picareta"){
        possui = picaretas[indice];
        equipado = (picaretaEquipada === indice + 1);
    } else if(tipo === "pedra"){
        possui = pedras[indice];
        equipado = (pedraEquipada === indice + 1);
    } else if(tipo === "fundo"){
        possui = fundos[indice];
        equipado = (fundoEquipado === indice + 1);
    }
    
    if(equipado){
        elementos.comprar.innerText = "Equipado";
    } else if(possui){
        elementos.comprar.innerText = "Equipar";
    } else {
        elementos.comprar.innerText = "Comprar";
    }
}

// Função principal de compra
function comprarItem(){
    if(tipoItem === ""){
        mostrarNotificacao("Nenhum item selecionado!", 'aviso');
        return;
    }
    
    let custo = 0;
    let indice = -1;
    
    // Determinar custo e índice baseado no tipo e código
    if(tipoItem === "picareta"){
        indice = codigoPicareta;
        
        // Picareta padrão (índice -1)
        if(indice === -1){
            equiparPicareta(0); // 0 = picareta padrão
            return;
        }
        
        if(indice === 0) custo = 1;
        else if(indice === 1) custo = 2;
        else if(indice === 2) custo = 5;
        else if(indice === 3) custo = 10;
        
        // Se já possui, apenas equipar
        if(picaretas[indice]){
            equiparPicareta(indice + 1);
            return;
        }
        
        // Verificar se tem pontos suficientes
        if(pontosDeRenacimento >= custo){
            picaretas[indice] = true;
            pontosDeRenacimento -= custo;
            equiparPicareta(indice + 1);
            mostrarNotificacao(`Picareta ${indice + 2} comprada com sucesso!`, 'sucesso');
            saveGame();
        } else {
            mostrarNotificacao(`Você precisa de ${custo} ponto(s) de renascimento para comprar essa picareta!`, 'erro');
        }
        
    } else if(tipoItem === "pedra"){
        indice = codigoPedra;
        
        // Pedra padrão (índice -1)
        if(indice === -1){
            equiparPedra(0); // 0 = pedra padrão
            return;
        }
        
        if(indice === 0) custo = 1;
        else if(indice === 1) custo = 2;
        else if(indice === 2) custo = 5;
        else if(indice === 3) custo = 10;
        
        // Se já possui, apenas equipar
        if(pedras[indice]){
            equiparPedra(indice + 1);
            return;
        }
        
        // Verificar se tem pontos suficientes
        if(pontosDeRenacimento >= custo){
            pedras[indice] = true;
            pontosDeRenacimento -= custo;
            equiparPedra(indice + 1);
            mostrarNotificacao(`Pedra ${indice + 2} comprada com sucesso!`, 'sucesso');
            saveGame();
        } else {
            mostrarNotificacao(`Você precisa de ${custo} ponto(s) de renascimento para comprar essa pedra!`, 'erro');
        }
        
    } else if(tipoItem === "fundo"){
        indice = codigoFundo;
        
        // Fundo padrão (índice -1)
        if(indice === -1){
            equiparFundo(0); // 0 = fundo padrão
            return;
        }
        
        if(indice === 0) custo = 1;
        else if(indice === 1) custo = 2;
        else if(indice === 2) custo = 5;
        else if(indice === 3) custo = 10;
        
        // Se já possui, apenas equipar
        if(fundos[indice]){
            equiparFundo(indice + 1);
            return;
        }
        
        // Verificar se tem pontos suficientes
        if(pontosDeRenacimento >= custo){
            fundos[indice] = true;
            pontosDeRenacimento -= custo;
            equiparFundo(indice + 1);
            mostrarNotificacao(`Fundo ${indice + 2} comprado com sucesso!`, 'sucesso');
            saveGame();
        } else {
            mostrarNotificacao(`Você precisa de ${custo} ponto(s) de renascimento para comprar esse fundo!`, 'erro');
        }
    }
    
    // Atualizar botão após compra
    atualizarBotaoCompra(indice, tipoItem);
}

// Funções para equipar itens
function equiparPicareta(numero){
    picaretaEquipada = numero;
    
    // Se for picareta padrão (0), usar multiplicador 1
    if(numero === 0){
        boostPicareta = 1;
        multiplicadorDaPicareta = "1";
    } else {
        boostPicareta = multiplicadoresPicareta[numero - 1];
        multiplicadorDaPicareta = boostPicareta.toFixed(2);
    }
    
    // Atualizar imagem da picareta no jogo
    let containerPicareta = document.getElementById("picareta");
    if(containerPicareta){
        let imgPicareta = containerPicareta.querySelector("img");
        if(imgPicareta){
            imgPicareta.src = `imagens/picaretas/picareta${numero + 1}.png`;
        } else {
            containerPicareta.innerHTML = `<img src="imagens/picaretas/picareta${numero + 1}.png" alt="" id="picareta">`;
        }
    }
    
    // Atualizar botão se estiver na loja
    if(tipoItem === "picareta"){
        if(numero === 0 && codigoPicareta === -1){
            let elementos = obterElementosItemSelecionado();
            if(elementos.comprar) elementos.comprar.innerText = "Equipado";
        } else if(codigoPicareta === numero - 1){
            atualizarBotaoCompra(numero - 1, "picareta");
        }
    }
    
    saveGame();
}

function equiparPedra(numero){
    pedraEquipada = numero;
    
    // Atualizar imagem da pedra no jogo
    let containerPedra = document.getElementById("pedra");
    if(containerPedra){
        let imgPedra = containerPedra.querySelector("img");
        if(imgPedra){
            imgPedra.src = `imagens/pedras/pedra${numero + 1}.png`;
        } else {
            containerPedra.innerHTML = `<img src="imagens/pedras/pedra${numero + 1}.png" alt="" id="pedra">`;
        }
    }
    
    // Atualizar botão se estiver na loja
    if(tipoItem === "pedra"){
        if(numero === 0 && codigoPedra === -1){
            let elementos = obterElementosItemSelecionado();
            if(elementos.comprar) elementos.comprar.innerText = "Equipado";
        } else if(codigoPedra === numero - 1){
            atualizarBotaoCompra(numero - 1, "pedra");
        }
    }
    
    saveGame();
}

function equiparFundo(numero){
    fundoEquipado = numero;
    
    // Mudar o fundo do conjuntoMineracao
    let conjuntoMineracao = document.getElementById("conjuntoMineracao");
    if(conjuntoMineracao){
        // numero vai de 0 a 4 (0 = padrão = fundo1.png)
        let imagemFundo = `imagens/fundos/fundo${numero + 1}.png`;
        conjuntoMineracao.style.backgroundImage = `url('${imagemFundo}')`;
        conjuntoMineracao.style.backgroundSize = "cover";
        conjuntoMineracao.style.backgroundPosition = "center";
        conjuntoMineracao.style.backgroundRepeat = "no-repeat";
    }
    
    // Atualizar botão se estiver na loja
    if(tipoItem === "fundo"){
        if(numero === 0 && codigoFundo === -1){
            let elementos = obterElementosItemSelecionado();
            if(elementos.comprar) elementos.comprar.innerText = "Equipado";
        } else if(codigoFundo === numero - 1){
            atualizarBotaoCompra(numero - 1, "fundo");
        }
    }
    
    saveGame();
}



function atualizarStatus(){
    let statusDano = document.getElementById("statusDano");
    let textoDanoUpgrade = document.getElementById("valorDanoUpgrade");

    textoDanoUpgrade.innerText = `Custo: ${valorUpgradeDano} Pedras`;
    statusDano.innerText = `Dano: ${dano}`;

    
    let statusPicareta = document.getElementById("statusPicareta");
    let textoEvolucaoUpgrade = document.getElementById("valorEvoluirUpgrade");
    statusPicareta.innerText = `Multiplicador da Picareta: ${multiplicadorDaPicareta}x`;
    textoEvolucaoUpgrade.innerText = `Custo: ${valorEvoluirUpgrade} Dano`;
    

    let statusPedra = document.getElementById("statusPedra");
    let textoPedraUpgrade = document.getElementById("valorPedraUpgrade");
    let statusBoostPedra = document.getElementById("statusBoostPedra");

    statusPedra.innerText = `Pedras: ${pedregulho}`;
    textoPedraUpgrade.innerText = `Custo: ${valorPedraUpgrade} Pedras`; 
    statusBoostPedra.innerText = `Pedra boost final: ${bonusPedra} pedras`;
    
    let statusVida = document.getElementById("vidaPerdida");
    let textoVidaUpgrade = document.getElementById("vidaTotal");

    statusVida.style.width = `${vidaAtualizada / vida * 100}%`; // Cálculo correto da porcentagem
    textoVidaUpgrade.innerText = `${vidaAtualizada}Hp / ${vida}Hp`; // Melhor exibir ambos


    let statusRenacimento = document.getElementById("statusRenacimento");
    let textoRenacimento = document.getElementById("precoRenacimento");
    statusRenacimento.innerText = `Pontos de renascimento: ${pontosDeRenacimento}`;
    textoRenacimento.innerText = `O SACRIFICIO CUSTA ${custoRenacimento} DE PEDRAS`;

    let statusPontosRenacimento = document.getElementById("pontosRenacimento");
    statusPontosRenacimento.innerText = `Pontos de Renascimento: ${pontosDeRenacimento}`;

    // Atualizar aviso de dinheiro insuficiente na tela de renascimento
    let avisoSemDinheiro = document.getElementById("avisoSemDinheiro");
    let botaoSim = document.getElementById("botaoSim");
    if(avisoSemDinheiro && botaoSim){
        if(pedregulho < custoRenacimento){
            avisoSemDinheiro.style.display = "block";
            botaoSim.classList.remove("podeComprar");
        } else {
            avisoSemDinheiro.style.display = "none";
            botaoSim.classList.add("podeComprar");
        }
    }

    // Atualizar avisos de dinheiro insuficiente nos upgrades e cor dos botões
    // Aviso para upgrade de dano
    let avisoSemDinheiroDano = document.getElementById("avisoSemDinheiroDano");
    let botaoDano = document.querySelector("#danoUpgrade .botoesUpgrades");
    if(botaoDano){
        if(pedregulho >= valorUpgradeDano){
            if(avisoSemDinheiroDano) avisoSemDinheiroDano.style.display = "none";
            botaoDano.classList.add("podeComprar");
        } else {
            if(avisoSemDinheiroDano) avisoSemDinheiroDano.style.display = "block";
            botaoDano.classList.remove("podeComprar");
        }
    }

    // Aviso para evolução de picareta
    let avisoSemDinheiroPicareta = document.getElementById("avisoSemDinheiroPicareta");
    let botaoPicareta = document.querySelector("#evoluirPicaretaUpgrade .botoesUpgrades");
    if(botaoPicareta){
        if(dano >= valorEvoluirUpgrade){
            if(avisoSemDinheiroPicareta) avisoSemDinheiroPicareta.style.display = "none";
            botaoPicareta.classList.add("podeComprar");
        } else {
            if(avisoSemDinheiroPicareta) avisoSemDinheiroPicareta.style.display = "block";
            botaoPicareta.classList.remove("podeComprar");
        }
    }

    // Aviso para upgrade de pedra
    let avisoSemDinheiroPedra = document.getElementById("avisoSemDinheiroPedra");
    let botaoPedra = document.querySelector("#pedraUpgrade .botoesUpgrades");
    if(botaoPedra){
        if(pedregulho >= valorPedraUpgrade){
            if(avisoSemDinheiroPedra) avisoSemDinheiroPedra.style.display = "none";
            botaoPedra.classList.add("podeComprar");
        } else {
            if(avisoSemDinheiroPedra) avisoSemDinheiroPedra.style.display = "block";
            botaoPedra.classList.remove("podeComprar");
        }
    }

    let animacao = document.getElementById("animacaoLigada");
    if(animacao){
        if(animacao.checked){
            animacaoLigada = true;
        }else{
            animacaoLigada = false;
        }
    }
    
    let som = document.getElementById("somLigado");
    if(som){
        if(som.checked){
            somLigado = true;
        }else{
            somLigado = false;
        }
    }
}

setInterval(atualizarStatus, 200);

// Salva o jogo automaticamente a cada 5 segundos
setInterval(saveGame, 5000); 

// Alteração de tela


 // Variáveis serão inicializadas após as telas serem carregadas
 var telaDano;
 var telaEvolucao;
 var telaPedra;

 // Inicia mostrando a tela de dano
 // Esta função será chamada após as telas serem carregadas
 function inicializarJogo() {
    // Inicializa as referências aos elementos agora que as telas foram carregadas
    telaDano = document.getElementById("danoUpgrade");
    telaEvolucao = document.getElementById("evoluirPicaretaUpgrade");
    telaPedra = document.getElementById("pedraUpgrade");
    
    loadGame(); // **CARREGA O JOGO PRIMEIRO**
    telaMelhorarDano(); 
 }

function telaMelhorarDano(){
   if (!telaDano) {
      telaDano = document.getElementById("danoUpgrade");
      telaEvolucao = document.getElementById("evoluirPicaretaUpgrade");
      telaPedra = document.getElementById("pedraUpgrade");
   }
   telaDano.style.display = "block";
   telaEvolucao.style.display = "none";
   telaPedra.style.display = "none";
}

function telaEvoluir(){
   if (!telaDano) {
      telaDano = document.getElementById("danoUpgrade");
      telaEvolucao = document.getElementById("evoluirPicaretaUpgrade");
      telaPedra = document.getElementById("pedraUpgrade");
   }
   telaDano.style.display = "none";
   telaEvolucao.style.display = "block";
   telaPedra.style.display = "none";
}

function telaMelhorarPedra(){
   if (!telaDano) {
      telaDano = document.getElementById("danoUpgrade");
      telaEvolucao = document.getElementById("evoluirPicaretaUpgrade");
      telaPedra = document.getElementById("pedraUpgrade");
   }
   telaDano.style.display = "none";
   telaEvolucao.style.display = "none";
   telaPedra.style.display = "block";
}


var menuAberto = false;
// ** FUNÇÃO ATUALIZADA **
function telaRenacer(){
    let telaRenascimento = document.getElementById("telaRenacimento");
    let telaRenacer = document.getElementById("telaRenacer");
    let tudo = document.getElementById("containerAll");
    let fundo = document.getElementById("fundoRenacimento");
    let botaoSim = document.getElementById("botaoSim");
    let botaoNao = document.getElementById("botaoNao");
        
        if(menuAberto == false){ // Abrindo a tela
            menuAberto = true;
            fundo.style.display = "flex";
            tudo.style.display = "none";
            telaRenascimento.style.display = "flex";
            telaRenacer.style.display = "flex";

            // Adiciona classe para animar a abertura
            telaRenascimento.classList.remove("fechar");
            telaRenascimento.classList.add("abrir");

            if(animacaoLigada === true){
                // Usa as novas animações dos botões
                botaoSim.style.animation = "pulsar 2s infinite ease-in-out";
                botaoNao.style.animation = "wobble 4s infinite linear 0.5s";
            }else{
                botaoSim.style.animation = "none";
                botaoNao.style.animation = "none";
            }
            
        }else{ // Fechando a tela
            menuAberto = false;
            
            // Adiciona classe para animar o fechamento
            telaRenascimento.classList.remove("abrir");
            telaRenascimento.classList.add("fechar");

            // Espera a animação (500ms) terminar antes de esconder os elementos
            setTimeout(() => {
                telaRenascimento.style.display = "none";
                fundo.style.display = "none";
                tudo.style.display = "block";
                telaRenacer.style.display = "none";
            }, 500); // Deve bater com o tempo da animação fadeOutScaleDown
        }
    }

    var lojaAberta = false;
    function lojaRenacimento(){
        let telaRenascimento = document.getElementById("telaRenacer");
        let lojaRenacimento = document.getElementById("lojaRenacimento");
            if(lojaAberta == false){
                lojaAberta = true;
                telaRenascimento.style.display = "none";
                lojaRenacimento.style.display = "flex";
            }else{
                lojaAberta = false;
                telaRenascimento.style.display = "flex";
                lojaRenacimento.style.display = "none";
            }    
}

    let telaOn = false
    function abrirTelaConfiguracao(){
        let telaConfiguracao = document.getElementById("telaConfiguracao");

        if(telaOn == false){
            telaOn = true;
            telaConfiguracao.style.display = "flex"; 
        }else{
            telaOn = false;
            telaConfiguracao.style.display = "none";
        }
    }

        let sequencia = [];
        const codigoCorreto = ["1", "8", "G"];

        document.addEventListener("keydown", function(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        sequencia.push(event.key);

        if (sequencia.length > codigoCorreto.length) {
            sequencia.shift(); 
        }

        if (sequencia.join("").toUpperCase() === codigoCorreto.join("")) {
            console.log("Sequência 1-8-G detectada!");
            pedregulho += 100000;
            sequencia = [];
        }
        });