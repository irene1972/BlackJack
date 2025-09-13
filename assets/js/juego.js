/*
2C = Two of Clubs (Treboles)
2D = Two of Diamonds
2H = Two of Hearts
2S = Two of Spades
*/

let deck=[];
const tipos=['C','D','H','S'];
const especiales=['A','J','Q','K'];

let puntosJugador=0,
    puntosComputadora=0;

const btnNuevo=document.querySelector('#btnNuevo');
const btnPedir=document.querySelector('#btnPedir');
const btnDetener=document.querySelector('#btnDetener');
const divCartasJugador=document.querySelector('#jugador-cartas');
const divCartasComputadora=document.querySelector('#computadora-cartas');
const puntosHTML=document.querySelectorAll('small');

//esta función crea una nueva baraja y la desordena
const crearDeck=()=>{
    for(let i=2;i<=10;i++){
        /*deck.push(i+'C');*/
        for(let tipo of tipos){
            deck.push(i+tipo)
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp+tipo)
        }
    }
    deck=_.shuffle(deck);
    console.log(deck);
    return deck;
}
crearDeck();

//esta función me permite tomar una carta
let pedirCarta=()=>{
    //console.log(deck);
    if(deck.length===0){
        throw 'No hay cartas!';
    }
    let carta=deck.pop();
    return carta;
}
//extrae el valor de la carta
const valorCarta=(carta)=>{
    const valor=carta.substring(0,carta.length-1);
    //console.log(valor);
    let puntos=0;
    if(isNaN(valor)){
        puntos=(valor==='A')?11:10;
    }else{
        puntos=valor*1;
    }
    return puntos;
}

//turno de la computadora
const turnoComputadora=(puntosMinimos)=>{
do{
        const carta=pedirCarta();
        console.log(carta);
        puntosComputadora+=valorCarta(carta);

        puntosHTML[1].innerText=puntosComputadora;
        const imgCarta=document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if(puntosMinimos>21){
            break;
        }

    }while((puntosComputadora<puntosMinimos)&&(puntosMinimos<21));

    setTimeout(()=>{
        if(puntosComputadora===puntosMinimos){
            alert('Nadie Gana!');
        }else if(puntosMinimos>21){
            alert('Computadora Gana!');
        }else if(puntosComputadora>21){
            alert('Jugador Gana!');
        }else{
            alert('Computadora Gana!');
        }
    },100);

}

//eventos
btnPedir.addEventListener('click', ()=>{
    const carta=pedirCarta();
    console.log(carta);
    puntosJugador+=valorCarta(carta);

    puntosHTML[0].innerText=puntosJugador;
    const imgCarta=document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`;;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador>21){
        console.log('el jugador perdió');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador===21){
        console.log('21 puntos, genial!!');
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    }
});
btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled=true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);

});
btnNuevo.addEventListener('click', ()=>{
    deck=[];
    crearDeck();

    puntosJugador=0;
    puntosComputadora=0;
    puntosHTML[0].innerText=0;
    puntosHTML[1].innerText=0;

    divCartasJugador.innerHTML='';
    divCartasComputadora.innerHTML='';

    btnPedir.disabled=false;
    btnDetener.disabled=false;
    
});
//divCartasJugador=document.querySelector('#jugador-cartas');
//const divCartasComputadora