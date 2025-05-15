var vida = 100;
var pedras = 0;
var dano = 1;
var valorUpgrade = 20;
var nivelDano = 1;

function minerar(){
    picareta = document.getElementById("picareta");
    pedra = document.getElementById("pedra");
    botao = document.getElementById("botaoMinerar");
    textoVida = document.getElementById("vidaTotal");
    statusVida = document.getElementById("vidaPerdida");
    textoPedra = document.getElementById("statusPedra");

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
        pedras = pedras + 50;
        pedra.style.animation = 'none';
        void pedra.offsetWidth;
        pedra.style.animation = `pedraMorre 0.7s linear 1 0.4s`;  
    }else{
        pedras = pedras + dano;  
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

function melhoriaDano(){
    let textoDanoUpgrade = document.getElementById("valorDanoUpgrade");
    let statusDano = document.getElementById("statusDano");
    if(pedras >= valorUpgrade){
            pedras = pedras - valorUpgrade;
            dano = dano + 1;
            nivelDano += 1;
            valorUpgrade = Math.floor(20 * (1.5 ** (nivelDano - 1)));
            textoDanoUpgrade.innerText = `Custo: ${valorUpgrade} Pedras`;
            statusDano.innerText = `Dano: ${dano}`;

    }
}
    
    

