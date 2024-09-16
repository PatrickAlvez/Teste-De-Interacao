const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d')
const personagem = {
    x: multiploDeCinco(50,600),
    y: multiploDeCinco(50,250),
    size: 50,
    speed: 5,
};

const objeto = {
    x: multiploDeCinco(50,600),
    y: multiploDeCinco(50,250),
    size: 50,
    speed: 10
};

function multiploDeCinco(min,max){
    const random = Math.floor((Math.random() * ((max - min) / 5))) * 5 + min
    return random
}

function verificaPosicoes() {
    if(verificaColisaoObjeto()){
        console.log(verificaColisaoObjeto());
        objeto.x = multiploDeCinco(50,600);
        objeto.y = multiploDeCinco(50,250);
        verificaPosicoes();
    }else{
        desenhaBackground();
        desenhaPersonagem();
        desenhaObjeto();
    }
}

function desenhaPersonagem() {
    ctx.fillStyle = 'red';
    ctx.fillRect(personagem.x, personagem.y, personagem.size, personagem.size);
};

function desenhaBackground() {
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function desenhaObjeto() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(objeto.x, objeto.y, objeto.size, objeto.size);
}

function verificaColisaoObjeto() {
    if (personagem.x < objeto.x+objeto.size &&
        personagem.x+personagem.size > objeto.x &&
        personagem.y < objeto.y+objeto.size &&
        personagem.y+personagem.size > objeto.y) {
        return true
    }
    return false
}

function verificaColisaoBorda(perOuObjt){
    if(perOuObjt.x < 0 ||
        perOuObjt.x+perOuObjt.size > canvas.width ||
        perOuObjt.y < 0 ||
        perOuObjt.y+perOuObjt.size > canvas.height
    ){
        return true
    }
    return false
}

function proximoAoObjeto() {
    const distanceX = Math.abs((personagem.x + personagem.size / 2) - (objeto.x + objeto.size / 2));
    const distanceY = Math.abs((personagem.y + personagem.size / 2) - (objeto.y + objeto.size / 2));
    const maxDistanceX = (personagem.size / 2) + (objeto.size / 2);
    const maxDistanceY = (personagem.size / 2) + (objeto.size / 2);

    return distanceX <= maxDistanceX && distanceY <= maxDistanceY;
}

function moveObjeto() {
    const personagemCentroX = personagem.x + personagem.size / 2;
    const personagemCentroY = personagem.y + personagem.size / 2;
    const objetoCentroX = objeto.x + objeto.size / 2;
    const objetoCentroY = objeto.y + objeto.size / 2;

    if (personagemCentroX < objetoCentroX && personagem.y == objeto.y) { //personagem na esquerda, move objeto pra direita
        objeto.x += objeto.speed;
    } else if (personagemCentroX > objetoCentroX && personagem.y == objeto.y) { //personagem na direita, move objeto pra esquerda
        objeto.x -= objeto.speed;
    }
    if (personagemCentroY < objetoCentroY && personagem.x == objeto.x) { //personagem em cima, move objeto para baixo
        objeto.y += objeto.speed;
    } else if (personagemCentroY > objetoCentroY && personagem.x == objeto.x) { //personagem embaixo, move objeto para cima
        objeto.y -= objeto.speed;
    }
}

function movimentaPersonagem(key){
    const previousPositionPer = { x: personagem.x, y: personagem.y }
    const previousPositionObjt = { x: objeto.x, y: objeto.y}
    switch (key) {
        case 'w':
            personagem.y -= personagem.speed
            break;

        case 'a':
            personagem.x -= personagem.speed
            break;

        case 's':
            personagem.y += personagem.speed
            break;

        case 'd':
            personagem.x += personagem.speed
            break;

        case 'f':
            if(proximoAoObjeto()){
                moveObjeto();
            }
            break;
        case 't': //tecla de testes
            console.log(multiploDeCinco(50,600))
            break;

        default:
            break;
    }

    if(verificaColisaoObjeto() && key !== 'f'){
        personagem.x = previousPositionPer.x
        personagem.y = previousPositionPer.y
    }

    if(verificaColisaoBorda(personagem)){
        personagem.x = previousPositionPer.x
        personagem.y = previousPositionPer.y
    }

    if(verificaColisaoBorda(objeto)){
        objeto.x = previousPositionObjt.x
        objeto.y = previousPositionObjt.y
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    desenhaBackground();
    desenhaPersonagem();
    desenhaObjeto();
}

document.addEventListener('keydown', (evento) => {
    movimentaPersonagem(evento.key);
});

verificaPosicoes();















