var vida = 100;
var vidaAtualizada = 100;
var pedras = 0;
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

boostPicareta = 1;

function minerar(){
    let picareta = document.getElementById("picareta");
    let pedra = document.getElementById("pedra");
    let botao = document.getElementById("botaoMinerar");


    //animação da picareta
    picareta.style.animation = 'none';
    void picareta.offsetWidth;
    picareta.style.animation = `minerar 0.5s linear 1`;


    //disabilitando o botão
    botao.disabled = true;
    setTimeout(() => {
    botao.disabled = false;
  }, 1000);

    //tirando vida da pedra
    vidaAtualizada = vidaAtualizada - dano;
    
    //ganhando pedras
    if(vidaAtualizada <= 0){
        vidaAtualizada = vida;

        // Ganho matatando a Pedra
        pedras += Math.floor(bonusPedra * multiplicadorDaPicareta );

        pedra.style.animation = 'none';
        void pedra.offsetWidth;
        pedra.style.animation = `pedraMorre 0.7s linear 1 0.4s`;  
    }else{
        // Ganho sem matar a Pedra
        pedras += Math.floor(dano * multiplicadorDaPicareta); 
        pedra.style.animation = 'none';
        void pedra.offsetWidth;
        pedra.style.animation = `pedraHit 0.7s linear 1 0.4s`;      
    }

}

// Upgrades

function melhoriaDano(){

    if(pedras >= valorUpgradeDano){
            pedras = pedras - valorUpgradeDano;
            dano = dano + 1;
            nivelDano += 1;
            valorUpgradeDano = Math.floor(20 * (1.18 ** (nivelDano - 1)));

    }

}

function melhoriaPicareta(){

    if(dano >= valorEvoluirUpgrade){
        dano = 1;
        nivelDano = 1;
        statusDano.innerText = `Dano: ${dano}`;

        multiplicadorDaPicareta = (multiplicadorDaPicareta * 1.6).toFixed(2);
        valorEvoluirUpgrade = Math.floor(valorEvoluirUpgrade * 1.45);
        valorUpgradeDano = Math.floor(20 * (1.5 ** (nivelDano - 1)));

        
}

}

function melhoriaPedra(){
    if(pedras >= valorPedraUpgrade){
        pedras = pedras - valorPedraUpgrade;
        vida = Math.floor(vida * 1.4);
        vidaAtualizada = vida;
        valorPedraUpgrade = Math.floor(valorPedraUpgrade * 1.70);

        bonusPedra = Math.floor(bonusPedra * 2);
    }
}

function renacer(){
    if(pedras >= custoRenacimento){
        custoRenacimento = Math.floor(custoRenacimento * 2);

        vida = 100;
        vidaAtualizada = 100;
        pedras = 0;
        bonusPedra = 30;
        dano = 1;
        valorUpgradeDano = 20;
        valorEvoluirUpgrade = 10;
        valorPedraUpgrade = 300;

        nivelDano = 1;
        multiplicadorDaPicareta = 1;
        
        pontosDeRenacimento += 1;
        numeroDeRenacimentos += 1;
        telaRenacer();
    }
}

var picaretaEquipada = 0;
var codigoPicareta = -1;
var picaretas = [false, false,false,false];

var titulo = document.getElementById("tituloItemSelecionado");
var foto = document.getElementById("imagemItemSelecionado");
var preco = document.getElementById("precoItemSelecionado");
var descricao = document.getElementById("descricaoItemSelecionado");
var comprar = document.getElementById("botaoComprar");

function abrirMenuCompraPicareta2(){

titulo.innerText = "Picareta 2";
foto.src = "picareta1.png";
preco.innerText = "Custo: 1 Ponto de Renacimento";
descricao.innerText = "Picareta de Ferro: Aumenta o multiplicador da picareta em 2x";

if(picaretas[0] == true && picaretaEquipada == 1){
comprar.innerText = "Equipada";
}else if(picaretas[0] == true && picaretaEquipada !=1){
    comprar.innerText = "Equipar";
}else{
    comprar.innerText = "Comprar";
}
codigoPicareta = 0;
}

function comprarItem(){
     if(picaretas[codigoPicareta] == true){
        picaretaEquipada = 1;
        comprar.innerText = "Equipada";
        boostPicareta = 2;
        multiplicadorDaPicareta = boostPicareta.toFixed(2);


        return;
    }else if(pontosDeRenacimento >= 1){
        picaretas[0] = true;
        picaretaEquipada = 1;
        pontosDeRenacimento -= 1;
        comprar.innerText = "Equipada";
        alert("Picareta de Pedra comprada com sucesso!");
        boostPicareta = 2;
        multiplicadorDaPicareta = boostPicareta.toFixed(2);
        return;
        

    }else{
        alert("Você precisa de 1 ponto de renacimento para comprar essa picareta!");
    }
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

    statusPedra.innerText = `Pedras: ${pedras}`;
    textoPedraUpgrade.innerText = `Custo: ${valorPedraUpgrade} Pedras`; 
    statusBoostPedra.innerText = `Pedra boost final: ${bonusPedra} pedras`;
    
    let statusVida = document.getElementById("vidaPerdida");
    let textoVidaUpgrade = document.getElementById("vidaTotal");

    statusVida.style.width = `${vidaAtualizada}%`;
    textoVidaUpgrade.innerText = `${vidaAtualizada}Hp`;


    let statusRenacimento = document.getElementById("statusRenacimento");
    let textoRenacimento = document.getElementById("precoRenacimento");
    statusRenacimento.innerText = `Renascimentos: ${numeroDeRenacimentos}`;
    textoRenacimento.innerText = `O SACRIFICIO CUSTA ${custoRenacimento} DE PEDRAS`;

    let statusPontosRenacimento = document.getElementById("pontosRenacimento");
    statusPontosRenacimento.innerText = `Pontos de Renascimento: ${pontosDeRenacimento}`;
}

setInterval(atualizarStatus, 200);

// Alteração de tela


 var telaDano = document.getElementById("danoUpgrade");
 var telaEvolucao = document.getElementById("evoluirPicaretaUpgrade");
 var telaPedra = document.getElementById("pedraUpgrade");

function telaMelhorarDano(){
  
   telaDano.style.display = "block";
   telaEvolucao.style.display = "none";
   telaPedra.style.display = "none";
}

function telaEvoluir(){
   telaDano.style.display = "none";
   telaEvolucao.style.display = "block";
   telaPedra.style.display = "none";
}

function telaMelhorarPedra(){
   telaDano.style.display = "none";
   telaEvolucao.style.display = "none";
   telaPedra.style.display = "block";
}


var menuAberto = false;
function telaRenacer(){
    let telaRenascimento = document.getElementById("telaRenacimento");
    let telaRenacer = document.getElementById("telaRenacer");
    let tudo = document.getElementById("containerAll");
    let fundo = document.getElementById("fundoRenacimento");
        if(menuAberto == false){
            menuAberto = true;
            telaRenascimento.style.display = "flex";
            telaRenascimento.style.animation = "abrirTelaRenacimento 3s 1 linear";
            telaRenacer.style.animation = "abrirTelaRenacimento 3s 1 linear";
            fundo.style.display = "flex";
            tudo.style.display = "none";
            telaRenacer.style.display = "flex";
            
        }else{
            menuAberto = false;
            telaRenascimento.style.display = "none";
            fundo.style.display = "none";
            tudo.style.display = "block";
            telaRenacer.style.display = "none";
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








    
    

