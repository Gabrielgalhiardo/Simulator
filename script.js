var vida = 100;
var pedras = 0;
var bonusPedra = 50;
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
    let textoVida = document.getElementById("vidaTotal");
    let statusVida = document.getElementById("vidaPerdida");
    let textoPedra = document.getElementById("statusPedra");

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
    vida = vida - dano;
    
    //ganhando pedras
    if(vida <= 0){
        vida = 100;
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
    textoVida.innerText = `${vida}Hp`;

    //mudando o texto da pedra
    textoPedra.innerText = `Pedras: ${pedras}`;
    
    //mudando a barrinha de vida
    statusVida.style.width = `${vida}%`;


}

// Upgrades

function melhoriaDano(){
    let textoDanoUpgrade = document.getElementById("valorDanoUpgrade");
    let statusDano = document.getElementById("statusDano");
    let statusPedra = document.getElementById("statusPedra");
    if(pedras >= valorUpgradeDano){
            pedras = pedras - valorUpgradeDano;
            dano = dano + 1;
            nivelDano += 1;
            valorUpgradeDano = Math.floor(20 * (1.5 ** (nivelDano - 1)));
            
            textoDanoUpgrade.innerText = `Custo: ${valorUpgradeDano} Pedras`;
            statusDano.innerText = `Dano: ${dano}`;
            statusPedra.innerText = `Pedras: ${pedras}`;   

    }
}

function melhoriaPicareta(){
    let textoEvolucaoUpgrade = document.getElementById("valorEvoluirUpgrade");
    let statusDano = document.getElementById("statusDano");
    let statusPicareta = document.getElementById("statusPicareta");
    let textoDanoUpgrade = document.getElementById("valorDanoUpgrade");

    if(dano >= valorEvoluirUpgrade){
        dano = 1;
        nivelDano = 1;
        statusDano.innerText = `Dano: ${dano}`;


        multiplicadorDaPicareta = multiplicadorDaPicareta * 1.4;
        valorEvoluirUpgrade = Math.floor(valorEvoluirUpgrade * 1.64);
        valorUpgradeDano = Math.floor(20 * (1.5 ** (nivelDano - 1)));

        textoDanoUpgrade.innerText = `Custo: ${valorUpgradeDano} Pedras`;
        textoEvolucaoUpgrade.innerText = `Custo: ${valorEvoluirUpgrade} Dano`;
        statusPicareta.innerText = `Multiplicador da Picareta: ${multiplicadorDaPicareta}`;
    }
}

function melhoriaPedra(){
    let textoPedraUpgrade = document.getElementById("valorPedraUpgrade");
    let statusPedra = document.getElementById("statusPedra");
    let statusBoostPedra = document.getElementById("statusBoostPedra");
    let textoVida = document.getElementById("vidaTotal");


    if(pedras >= valorPedraUpgrade){
        pedras = pedras - valorPedraUpgrade;
        vida = Math.floor(vida * 1.323);
        valorPedraUpgrade = Math.floor(valorPedraUpgrade * 1.61);


        bonusPedra = Math.floor(bonusPedra * 2.2);
        statusBoostPedra.innerText = `Pedra boost final: ${bonusPedra} pedras`;
            
        textoPedraUpgrade.innerText = `Custo: ${valorPedraUpgrade} Pedras`; 
        statusPedra.innerText = `Pedras: ${pedras}`;
        textoVida.innerText = `${vida}Hp`;

    }
}


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
    
    

