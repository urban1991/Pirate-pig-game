let scores, roundScore, activePlayer, gameOn;
const diceImg =document.querySelector('.diceImg'); 
const diceRollBtn = document.querySelector('.btn-roll');
const diceGrabBtn = document.querySelector('.btn-grab');
const newGameBtn = document.querySelector('.btn-new');

let score0 = document.getElementById('score-0');
let roundScore0= document.getElementById('roundScore-0');
let score1= document.getElementById('score-1');
let roundScore1= document.getElementById('roundScore-1');
let prevRoll;


init();

newGameBtn.addEventListener('click', init);

diceRollBtn.addEventListener('click', ()=> {
    if (gameOn){
        let diceRoll = Math.floor(Math.random()*6 + 1);
        diceImg.src = `public/dice-${diceRoll}.png`;
        diceImg.style.display = 'block';
        
        if (diceGrabBtn === 6 && prevRoll === 6){
            roundScore += (diceRoll*2);
            document.getElementById(`roundScore-${activePlayer}`).textContent = roundScore;
        } else if(diceRoll !== 1) {
            roundScore += diceRoll;
            document.getElementById(`roundScore-${activePlayer}`).textContent = roundScore;
        } else {
            playerSwitch();
        }
        prevRoll= diceRoll;
    }
    
});

diceGrabBtn.addEventListener('click', ()=> {
    if(gameOn){
        scores[activePlayer] += roundScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        let inputScore = document.querySelector('.win-score').value;
        let winScore;
        if (inputScore && inputScore > 0) {
            winScore = inputScore;
        } else {
            winScore = 100;
        }

        if (scores[activePlayer] >= winScore){
            document.querySelector(`#player-${activePlayer}`).textContent = 'You win!';
            document.querySelector(`.player-${activePlayer}-card`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-card`).classList.remove('active');           
            diceImg.style.display = 'none';
            gameOn = false;
        } else {
            playerSwitch();
        }    
    }    
});

function playerSwitch() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    roundScore0.textContent = '0';
    roundScore1.textContent = '0';
    document.querySelector('.player-0-card').classList.toggle('active');
    document.querySelector('.player-1-card').classList.toggle('active');
    diceImg.style.display = 'none';
};

function init() {
    scores = [0,0];
    activePlayer=0;
    roundScore = 0;
    gameOn =true;

    diceImg.style.display = 'none';
    score0.textContent = '0';
    roundScore0.textContent = '0';
    score1.textContent = '0';
    roundScore1.textContent = '0';

    document.querySelector(`#player-0`).textContent = 'Player 1';
    document.querySelector(`#player-1`).textContent = 'Player 2';

    document.querySelector('.player-0-card').classList.remove('winner');
    document.querySelector('.player-1-card').classList.remove('winner');
    
    document.querySelector('.player-0-card').classList.remove('active');
    document.querySelector('.player-1-card').classList.remove('active');

    document.querySelector('.player-0-card').classList.add('active');
    
};
