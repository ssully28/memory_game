
let score = 0;
let numberRemaining = 0;

let cards = [
    'cf_chester_bennington.jpg',
    'cf_chester_bennington.jpg',
    'cf_chris_cornell.jpg',
    'cf_chris_cornell.jpg',
    'cf_kurt_cobain.jpg',
    'cf_kurt_cobain.jpg'
];

let scoreElement = document.getElementById("score");
let playButton = document.getElementById("play");

resetGame();


// Cribbed from Stack:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    } 
}

// These vars will track the current 2 picks:
let pick1 = null;
let pick2 = null;



function turnCard(id) {
    score++;

    // Show the image...
    document.getElementById(id).src = 'images/' + cards[id];

    if (pick1) {
        // We already have pick1, so this has to be pick2:
        
        pick2 = id;

        // We'll need to disable the onclick or temporarily remove it so you can't reclick it....

        // Check if pick1 == pick2
        if (cards[pick1] === cards[pick2]){
            // If they do we 


            // Disable the clicks....
            document.getElementById(pick1).onclick = '';
            document.getElementById(pick2).onclick = '';


            // Subtract number of matches left:
            numberRemaining--;

            // Check if it's the end of the game:
            if (numberRemaining == 0) {
                // Yay...now what?
            }
            else {
                // more to go....keep going.
            }
        }
        else {
            // then we want to wait 2 seconds and
            // turn these cards back over.
            //alert('they do not match');

            // Reset selections after 2 seconds:
            setTimeout(function (pid1,pid2) {
                // Turn the two cards back over....
                document.getElementById(pid1).src = "card_back.jpg";
                document.getElementById(pid2).src = "card_back.jpg";

                // Plug the onclick event back in....

            }, 2000, pick1, pick2);


            
            
        }

        pick1 = null;
        pick2 = null;
    }
    else {
        pick1 = id;
    }

}

function resetPicks(p1,p2){
    // Turn Cards Back Over
    document.getElementById(p1).src = "card_back.jpg";
    document.getElementById(p2).src = "card_back.jpg";

    // Reinstate their onclick events

}

function turnCardFaceDown(id){
    document.getElementById(id).src = "card_back.jpg";
}



playButton.addEventListener("click", function () {
    resetGame();

    // hide all the cards
    for (let i = 0; i < 24; i++){
        document.getElementById(i).src = "card_back.jpg";
    }
    
});


function resetGame(){
    score = 0;
    numberRemaining = 12;

    // Need to re-add the event 

    // Initial Shuffle:
    shuffleArray(cards);
}