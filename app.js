const editName1 = document.querySelector('.first-edit');
const editName2 = document.querySelector('.second-edit');

const player1 = {
    playerName: document.querySelector('#name1'),
    score: 0,
    setScore: 0,
    totalSets: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1DisplayScore'),
}

const player2 = {
    playerName: document.querySelector('#name2'),
    score: 0,
    setScore: 0,
    totalSets: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2DisplayScore'),
}

editName1.addEventListener ('click', function () {
    player1.playerName.textContent = prompt('Enter player name:');
})
editName2.addEventListener ('click', function () {
    player2.playerName.textContent = prompt('Enter player name:');
})

const thCurrentSet = document.querySelectorAll('.currentSet')
const p1TdCurrentSet = document.querySelectorAll('.p1currentSet')
const p2TdCurrentSet = document.querySelectorAll('.p2currentSet')
const resetButton = document.querySelector('#reset');
const winningSets = document.querySelector('#playto');

let winningGoal = 2;
let isMatchOver = false;
let setNumber = 0;

winningSets.addEventListener('change', function () {
    winningGoal = parseInt(this.value);
    reset();
})


function updateScores(player, opponent) {
    player1.currentSet = document.querySelectorAll('.p1currentSet')[setNumber];
    player2.currentSet = document.querySelectorAll('.p2currentSet')[setNumber];
    if(!isMatchOver) {
        player.currentSet.classList.remove('hidden');
        opponent.currentSet.classList.remove('hidden');
        thCurrentSet[setNumber].classList.remove('hidden');
        player.score ++;
        if ((player.setScore === 6 && opponent.setScore === 6 && player.score >= 7 && opponent.score + 1 < player.score) || (!(player.setScore === 6 && opponent.setScore === 6) && player.score >= 4 && opponent.score + 1 < player.score)) {
            player.setScore ++;
            player.score = 0;
            opponent.score = 0;
            player.currentSet.textContent = player.setScore;
            player.display.textContent = '0';
            opponent.display.textContent = '0';
            if (player.setScore === 6 && opponent.setScore + 1 < player.setScore || player.setScore === 7) {
                player.totalSets ++;
                setNumber ++;
                player.setScore = 0;
                opponent.setScore = 0;
                if (player.totalSets === winningGoal) {
                    isMatchOver = true;
                    player.button.disabled = true;
                    opponent.button.disabled = true;
                    player.display.textContent = player.totalSets;
                    opponent.display.textContent = opponent.totalSets;
                    player.display.classList.add('bold');
                    opponent.display.classList.add('bold');
                    player.playerName.classList.add('final-winner');
                    opponent.playerName.classList.add('final-loser');
                }
            }
        } else if (player.setScore === 6 && opponent.setScore === 6) {
            player.display.textContent = player.score;
        } else if (player.score === 1) {
            player.display.textContent = 15;
        } else if (player.score === 2) {
            player.display.textContent = 30;
        } else if (player.score === 3 && opponent.score <=3) {
            player.display.textContent = 40;
        } else if (player.score > 3 && player.score === opponent.score) {
            player.display.textContent = 40;
            opponent.display.textContent = 40;
        } else if (player.score > 3 && opponent.score + 1 === player.score) {
            player.display.textContent = 'A';
            opponent.display.textContent = '';
        } 
    }
}

function reset() {
    isMatchOver = false;
    setNumber = 0;
    for (let i = 0; i < 5; i++) {
        p1TdCurrentSet[i].textContent = 0;
        p2TdCurrentSet[i].textContent = 0;
    }
    for (let i = 0; i < 4; i++) {
        p1TdCurrentSet[i + 1].classList.add('hidden');
        p2TdCurrentSet[i + 1].classList.add('hidden');
        thCurrentSet[i + 1].classList.add('hidden');
    }
    for(let p of [player1, player2]) {
        p.score = 0;
        p.setScore = 0;
        p.totalSets = 0;
        p.display.textContent = 0;
        p.display.classList.remove('bold');
        p.button.disabled = false;
        p.playerName.classList.remove('final-winner');
        p.playerName.classList.remove('final-loser');
    }
}

player1.button.addEventListener('click', function () {
    updateScores(player1, player2);
} )

player2.button.addEventListener('click', function () {
    updateScores(player2, player1);
} )

resetButton.addEventListener('click', reset);


