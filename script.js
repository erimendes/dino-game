//Capitura a tag da class definida como dino
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
    
    //Verifica o codigo ascii da tecla digitada(32 corresponde a barra de espaço)
    if(event.keyCode === 32){
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    let upInterval = setInterval(() => {
        if(position >= 150) {
            //faz parar em 150px
            clearInterval(upInterval);

            //faz descer
            let downIterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downIterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }else{
            // faz subir
            position += 20;
            dino.style.bottom = position + 'px';
        }
        
    }, 20);
}

function createCactus() {
    var cactus = document.createElement("div");
    let cactusPosition = 1000;
    // Tempo para gerar um novo cactus
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPosition < -60) {
          // Saiu da tela
          clearInterval(leftTimer);
          background.removeChild(cactus);
          //Verifica se o cactus tocou no dino
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
          // Game over
          clearInterval(leftTimer);
          isGameOver = true;
          background.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else {
          cactusPosition -= 10;
          cactus.style.left = cactusPosition + 'px';
        }
      }, 20);
      
      //função recursiva para criar um novo cactus
      setTimeout(createCactus, randomTime);
}

createCactus();
// Pega todo evento realizado no navegador
document.addEventListener('keyup', handleKeyUp);