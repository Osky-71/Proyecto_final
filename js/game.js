document.addEventListener("DOMContentLoaded", function() {
    initializeDeck();
});

let deckId = '';
let score1 = 0;
let score2 = 0;
let ties = 0;
let roundsPlayed = 0;
let maxRounds = 26;

async function initializeDeck() {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json();
    deckId = data.deck_id;
}

async function startGame() {
    if (!deckId) {
        await initializeDeck();
    }

    if (roundsPlayed < maxRounds) {
        const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
        const drawData = await drawResponse.json();
        const card1 = drawData.cards[0];
        const card2 = drawData.cards[1];

        document.getElementById('card1').src = card1.image;
        document.getElementById('card2').src = card2.image;

        const value1 = getCardValue(card1.value);
        const value2 = getCardValue(card2.value);

        if (value1 > value2) {
            score1++;
        } else if (value1 < value2) {
            score2++;
        } else {
            ties++;
        }

        updateScores();
        roundsPlayed++;

        if (roundsPlayed === maxRounds) {
            determinarGanadorPartida();
        }
    }
}

function getCardValue(value) {
    if (value === 'ACE') return 14;
    if (value === 'KING') return 13;
    if (value === 'QUEEN') return 12;
    if (value === 'JACK') return 11;
    return parseInt(value);
}

function updateScores() {
    document.getElementById('score1').innerText = score1;
    document.getElementById('score2').innerText = score2;
    document.getElementById('ties').innerText = ties;
}

function determinarGanadorPartida() {
    let winner = '';
    if (score1 > score2) {
        winner = 'La Maquina';
    } else if (score1 < score2) {
        winner = 'El Jugador';
    } else {
        winner = 'Empate';
    }

    updateScores(); // Actualiza los puntajes antes de mostrar la alerta

    setTimeout(function() {
        if(winner == 'La Maquina' || winner == 'El Jugador'){
            alert(`Fin de la partida.\n\nEl ganador es:  ${winner}`);}
        else{
            alert(`Fin de la partida.\n\nEsto es:  ${winner}`);
        }
    }, 200); // Muestra la alerta después de un retraso de 1 segundo (ajusta el valor según tus preferencias)
}

function showRules() {
    alert('Instrucciones del Juego:\n\n' +
          '1. Haz clic en "Iniciar juego".\n' +
          '2. Ambos jugadores sacarán una carta del mazo al mismo tiempo.\n' +
          '3. El jugador con la carta más alta ganará la ronda y se sumará puntos.\n' +
          '4. Si ambos jugadores sacan una carta del mismo valor, será un empate.\n' +
          '5. Continúa jugando rondas hasta que se acaben las cartas.\n' +
          '6. Al finalizar la ronda se mostrara el resultado del ganador.\n'+
          '7. Puedes presionar el boton recargar y empezara otra partida.\n'+
          '8. ¡Disfruta del juego y de la música de fondo!');
}

function resetGame() {
    deckId = '';
    score1 = 0;
    score2 = 0;
    ties = 0;
    roundsPlayed = 0;
    updateScores();
    document.getElementById('card1').src = 'path_to_your_placeholder_image.png';
    document.getElementById('card2').src = 'path_to_your_placeholder_image.png';
}

let isMuted = false;

function toggleMute() {
    const music = document.getElementById('musica');

    if (isMuted) {
        music.muted = false;
        isMuted = false;
    } else {
        music.muted = true;
        isMuted = true;
    }
}
function PlayAudio(){
    document.getElementById('musica').play();
}