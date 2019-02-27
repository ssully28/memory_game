

/*  List of singers:
Layne Staley
Scott Weiland
Jimmy Hendrix
Freddie Mercury
Jim Morrison
Janis Joplin
(need 3 more)
*/

let scoreElement = document.getElementById("score");
let playButton = document.getElementById("play");

let score = 0;        // Track score (total number of card clicks)
let selectCount = 0;  // We want to let the user make 2 selections before changing back....
let cards = {};       // Hold your card data  -->  card[id] = image.jpg
let counter = 0;      // Used for id of cards

let pickOne = 0;
let remaining = 12;

cards = populateCards();

playButton.addEventListener("click", function () {
    
    cards = {};
    cards = populateCards();
    
    for (let i = 1; i <= 24; i++){
        document.getElementById(i).src = "card_back.jpg";
    }
});

function populateCards(){
    let cardDeck = {};

    // We'll randomly pluck images from here to fill out the cards object
    let card_faces = [
        'cf_chester_bennington.jpg',
        'cf_chester_bennington.jpg',
        'cf_chris_cornell.jpg',
        'cf_chris_cornell.jpg',
        'cf_kurt_cobain.jpg',
        'cf_kurt_cobain.jpg'
    ];

    // Lets randomly splice that list of card faces to death:
    while (card_faces.length) {
        counter++
        cardDeck[counter] = (card_faces.splice(card_faces.length * Math.random() | 0, 1)[0]);
    }

    return cardDeck;
}

function turnCard(card_id) {
    selectCount++;
    score++;

    scoreElement.innerHTML = score;
    document.getElementById(card_id).src = "images/" + cards[card_id];

    if (selectCount === 1) {
        pickOne = card_id;
    }
    else {
        // We're on pick 2...

        selectCount = 0;

        let img1 = cards[pickOne];
        let img2 = cards[card_id];

        let img1Element = document.getElementById(pickOne);
        let img2Element = document.getElementById(card_id);

        if (img1 === img2){
            // Yay, we have a match!

        }
        else {
            // Give it 3 seconds, then chane back to back of card for both....
            
            turnCardFaceDown(pickOne);
            turnCardFaceDown(card_id);

            remaining--;

            if (remaining === 0) {
                // WINNER!
            }
            else {
                // Keep going...
            }

        }

        pickOne = 0;
        
    }

}

function turnCardFaceDown(id){
    document.getElementById(id).src = "card_back.jpg";
}