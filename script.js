var vida = 100;
var vidaAtualizada = 100;
var pedras = 10000;
var bonusPedra = 30;
var dano = 1;
var valorUpgradeDano = 20;
var valorEvoluirUpgrade = 10;
var valorPedraUpgrade = 300;

var nivelDano = 1;
var multiplicadorDaPicareta = 1;



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
        pedras += Math.floor(bonusPedra * multiplicadorDaPicareta);

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

        multiplicadorDaPicareta =(multiplicadorDaPicareta * 1.6).toFixed(2);
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
    
    

