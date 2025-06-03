//selecting buttons by their ID
const player1Btn =document.getElementById("player1Btn");
const player2Btn=document.getElementById("player2Btn");
const startBtn=document.getElementById("startBtn")

const message=document.getElementById("message");

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

function updateMessage() {
    const p1=localStorage.getItem("player1Joined");
    const p2=localStorage.getItem("player2Joined");

    if (currentPlayer==="Player 1" && p2 !="true"){
        message.textContent="Waiting for Player 2";
    }else if (currentPlayer === "Player 2" && p1 != "true"){
        message.textContent="Waiting for Player 1";
    } else if (p1==="true"&& p2==="true"){
        message.textContent="Both players Joined! Ready to play?";
    }
    }
function checkPlayers(){
    const p1=localStorage.getItem("player1Joined");
    const p2=localStorage.getItem("player2Joined");

    if (p1==="true" && p2 ==="true"){
        startBtn.disabled=false;
        updateMessage();
    }
}
