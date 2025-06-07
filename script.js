
//selecting buttons and elements by their ID
const player1Btn =document.getElementById("player1Btn");
const player2Btn=document.getElementById("player2Btn");
const startBtn=document.getElementById("startBtn")

const message=document.getElementById("message");

const countdownDisplay=document.getElementById("countdown");
const inputf=document.getElementById("inputField");



let currentPlayer ="";
let player1Score = 0;
let player2Score = 0;
let usedWords = JSON.parse(localStorage.getItem("usedWords")) || [];
let score =0;

//function to save player slection in local storage
player1Btn.addEventListener("click", ()=>{
    localStorage.setItem("player1Joined", "true")
    currentPlayer= "Player 1";
    
    updateMessage();
    checkPlayers();

});

player2Btn.addEventListener("click",() =>{
    localStorage.setItem("player2Joined", "true");
    currentPlayer="Player 2";
    
    updateMessage();
    checkPlayers();
});

//function to show updtes;
function updateMessage() {
    const p1=localStorage.getItem("player1Joined");
    const p2=localStorage.getItem("player2Joined");

    if (p1==="true" && p2 !="true"){
        message.textContent="Player 1 Joined, Waiting for Player 2";
    }else if (p2==="true" && p1 != "true"){
        message.textContent="Player 2 Joined, Waiting for Player 1";
    } else if (p1==="true"&& p2==="true"){
        message.textContent="Both players Joined! Ready to play?";
    }
    }

//function to active PlayNow button.
function checkPlayers(){
    const p1=localStorage.getItem("player1Joined");
    const p2=localStorage.getItem("player2Joined");

    if (p1==="true" && p2 ==="true"){
        startBtn.disabled=false;
        updateMessage();
    }
}

//function to countdown numbers when user clicked play btn.
startBtn.addEventListener("click", () => {
    let count = 3;
    countdownDisplay.textContent = count;
    startBtn.disabled = true;
    // Initialize scores and rounds in localStorage
    localStorage.setItem("player1Score", "0");
    localStorage.setItem("player2Score", "0");
    localStorage.setItem("round", "1");
    
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDisplay.textContent = count;
        } else {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "Go!";
            inputf.style.display = "block";
            localStorage.setItem("currentTurn", "Player 1");
            message.textContent = "It's player 1's turn.";
            document.getElementById("enterHint").style.display = "block";

            inputf.focus();
        }
    }, 1000);
});


//function to handle input words
inputf.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const turn = localStorage.getItem("currentTurn");
        if (turn !== currentPlayer) {
            message.textContent = `It's not your turn, wait for ${turn}`;
            return;
        }

        const word = inputf.value.trim().toLowerCase();
        if (word === "") {
            message.textContent = "Please Type a Word";
            return;
        }
        if (usedWords.includes(word)) {
            message.textContent = "Please Type a New Word";
            return;
        }

        usedWords.push(word);
        localStorage.setItem("usedWords", JSON.stringify(usedWords));

        // Get current scores
        let p1Score = parseInt(localStorage.getItem("player1Score") || "0", 10);
        let p2Score = parseInt(localStorage.getItem("player2Score") || "0", 10);
        let round = parseInt(localStorage.getItem("round") || "1", 10);

        // Update score and localStorage
        if (currentPlayer === "Player 1") {
            p1Score += word.length;
            localStorage.setItem("player1Score", p1Score.toString());
        } else {
            p2Score += word.length;
            localStorage.setItem("player2Score", p2Score.toString());
        }

        message.textContent = `'${word}' is accepted. Scores - Player 1: ${p1Score}, Player 2: ${p2Score}.`;

        // Determine next turn
        const nextTurn = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
        localStorage.setItem("currentTurn", nextTurn);

        if (currentPlayer === "Player 2") {
            round++;
            localStorage.setItem("round", round.toString());

            // Game over check
            if (round > 3) {
                inputf.style.display = "none";
                startBtn.disabled = true;

                let winner;
                if (p1Score > p2Score) {
                    winner = "Player 1";
                    message.textContent = `Game Over! 🏆 Player 1 wins with ${p1Score} points! 🎉`;
                } else if (p2Score > p1Score) {
                    winner = "Player 2";
                    message.textContent = `Game Over! 🏆 Player 2 wins with ${p2Score} points! 🎉`;
                } else {
                    winner = "Tie";
                    message.textContent = `Game Over! It's a Tie with ${p1Score} points each! 🤝`;
                }

                // Save high score
                let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
                highScores.push({
                    winner,
                    score: Math.max(p1Score, p2Score),
                    date: new Date().toLocaleString()
                });
                localStorage.setItem("highScores", JSON.stringify(highScores));

                showHighScores();
                return;
            } else {
                message.textContent += ` Round ${round - 1} completed. Starting round ${round}.`;
            }
        } else {
            message.textContent += ` It's now ${nextTurn}'s turn.`;
        }

        if (nextTurn !== currentPlayer) {
            inputf.style.display = "none";
        }

        inputf.value = "";
    }
});

function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    if (highScores.length === 0) {
        message.textContent += "\nNo past champions yet!";
        return;
    }

    message.textContent += "\n🏆 Past Champions:\n";
    highScores.slice(-5).reverse().forEach((entry, index) => {
        message.textContent += `${index + 1}. ${entry.winner} - ${entry.score} pts (${entry.date})\n`;
    });
}

const viewBtn = document.getElementById("viewHighScoresBtn");
const highScoresDiv = document.getElementById("highScoresSection");

viewBtn.addEventListener("click", () => {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    if (highScores.length === 0) {
        highScoresDiv.textContent = "🏆 No high scores yet. Be the first champion!";
    } else {
        let displayText = "🏆 Past Champions:\n";
        highScores.slice(-5).reverse().forEach((entry, index) => {
            displayText += `${index + 1}. ${entry.winner} - ${entry.score} pts (${entry.date})\n`;
        });
        highScoresDiv.textContent = displayText;
    }

    highScoresDiv.style.display = "block";
});
//Window event to know players turn in all tabs;
window.addEventListener("storage", (event) => {
    if (event.key === "currentTurn") {
        const newTurn = event.newValue;
        message.textContent = `It's ${newTurn}'s turn!`;
        
        if (currentPlayer === newTurn) {
            inputf.style.display = "block";
            inputf.focus();
        } else {
            inputf.style.display = "none";
        }
    }
});

window.addEventListener("storage", (event) => {
    if (event.key === "usedWords") {
        usedWords = JSON.parse(event.newValue || "[]");
    }
});
//to keep both tabs sync;
window.addEventListener("storage", (event) => {
    if (event.key === "player1Joined" || event.key === "player2Joined") {
        updateMessage();
        checkPlayers();
    }
});
// Detect when player is about to leave
window.addEventListener("beforeunload", () => {
    if (currentPlayer === "Player 1") {
        localStorage.removeItem("player1Joined");
    } else if (currentPlayer === "Player 2") {
        localStorage.removeItem("player2Joined");
    }
});

// Notify the other player if someone leaves
window.addEventListener("storage", (event) => {
    if ((event.key === "player1Joined" && event.newValue === null) ||
        (event.key === "player2Joined" && event.newValue === null)) {
        message.textContent = "The other player has left the duel.";
        startBtn.disabled = true;
        inputf.style.display = "none";
        document.getElementById("enterHint").style.display = "none";
    }
});


//window event to remove stored player selection everytime browser loads
window.onload =() => {
    localStorage.removeItem("player1Joined");
    localStorage.removeItem("player2Joined");
    localStorage.removeItem("currentTurn");
    startBtn.disabled=true;
    message.textContent="Select your Player to start the Game!"
    
}


