let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")
let count = 0;
let img = document.querySelector("#img");

//playerX, playerO
let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    img.classList.add("hideimg");
     
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerHTML = "O";
            turnO = false;
        }else{
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        console.log(count);
       
       let isWinner = checkWinnter();

        if(count === 9 && !isWinner){
            draw();
        }
    });
});

const draw = () => {
    msg.innerHTML = "Game was a Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    }
};

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    img.classList.remove("hideimg");
    disableBoxes();
}

const checkWinnter = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerHTML
        let pos2Val = boxes[pattern[1]].innerHTML
        let pos3Val = boxes[pattern[2]].innerHTML

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true
            }
        }
    }

    
}

newBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
