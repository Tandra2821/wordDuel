//selecting buttons and elements by their ID
const player1Btn =document.getElementById("player1Btn");
const player2Btn=document.getElementById("player2Btn");
const startBtn=document.getElementById("startBtn")

const message=document.getElementById("message");

const countdownDisplay=document.getElementById("countdown");
const inputf=document.getElementById("inputField");



let currentPlayer ="";

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
    countdownDisplay.textContent=count;
    startBtn.disabled=true;
    const countdownInterval =setInterval(() => {
        count --;
        if (count > 0){
            countdownDisplay.textContent = count
        }else {
            clearInterval(countdownInterval);
            countdownDisplay.textContent="Go!"
            inputf.style.display="block";
            localStorage.setItem("currentTurn", "Player 1");
            message.textContent="Its player 1's turn."
            document.getElementById("enterHint").style.display = "block"; 
            
            inputf.focus();
        }
    },1000)

});


let usedWords=[];
let score =0;

//function to handle input words
inputf.addEventListener("keydown",(event) =>{
    if(event.key==="Enter"){
        const turn=localStorage.getItem("currentTurn");
        if (turn !==currentPlayer){
            message.textContent=`It's not your turn, wait for ${turn}`;
            return;
        }
        const word=inputf.value.trim().toLocaleLowerCase();
        if (word===""){
            message.textContent="Please Type a Word"
            return;
        }
        if (usedWords.includes(word)){
            message.textContent="Please Type a New Word";
        }else {
            usedWords.push(word)
            score += word.length;
            message.textContent=`'${word}' is Accepted, Your Score is '${score}'.`;
            const nextTurn=currentPlayer==="Player 1"?"Player 2":"Player 1";
            localStorage.setItem("currentTurn",nextTurn);
            message.textContent += ` It's now ${nextTurn}'s turn.`;
            if (nextTurn !== currentPlayer) {
                inputf.style.display = "none";
            }
        }
        inputf.value="";

    }
});
//Function to know players turn in all tabs;
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
//to keep both tabs sync;
window.addEventListener("storage", (event) => {
    if (event.key === "player1Joined" || event.key === "player2Joined") {
        updateMessage();
        checkPlayers();
    }
});

//function to remove stored player selection everytime browser loads
window.onload =() => {
    localStorage.removeItem("player1Joined");
    localStorage.removeItem("player2Joined");
    localStorage.removeItem("currentTurn");
    startBtn.disabled=true;
    message.textContent="Select your Player to start the Game!"
    
}