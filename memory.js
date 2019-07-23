
const hasDory = /Dory/;

let score = 0;
let numberRemaining = 0;
let timeStarted = 0;
let numSecondsPlayed = 0;
let lastFeed = 0;
let isDoryMode = false;
let scoreElement = document.getElementById("score");
let playButton = document.getElementById("play");
let feed = document.getElementById("feedback");
let lastMatch = '';

// These vars will track the current 2 picks:
let pick1 = null;
let pick2 = null;

let cards = [
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-mqZc3XH/0/90489af5/S/i-mqZc3XH-S.jpg', // Bennington
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-mqZc3XH/0/90489af5/S/i-mqZc3XH-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-NwFxvMh/0/2e2242ed/S/i-NwFxvMh-S.jpg', // Cornell
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-NwFxvMh/0/2e2242ed/S/i-NwFxvMh-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-6mrsZw7/0/022a7c41/S/i-6mrsZw7-S.jpg', // Cobain
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-6mrsZw7/0/022a7c41/S/i-6mrsZw7-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-JL9n7g9/0/b46956da/S/i-JL9n7g9-S.jpg', // Vaughan
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-JL9n7g9/0/b46956da/S/i-JL9n7g9-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-sQcH6vZ/0/65d22bbc/S/i-sQcH6vZ-S.jpg', // Weiland
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-sQcH6vZ/0/65d22bbc/S/i-sQcH6vZ-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-SSx4VTN/0/016743f0/S/i-SSx4VTN-S.jpg', // Staley
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-SSx4VTN/0/016743f0/S/i-SSx4VTN-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-WHDTVHD/0/a9cd2b85/S/i-WHDTVHD-S.jpg', // Lennon
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-WHDTVHD/0/a9cd2b85/S/i-WHDTVHD-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-K2J3SNb/0/dbf26ae9/S/i-K2J3SNb-S.jpg', // Hendrix
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-K2J3SNb/0/dbf26ae9/S/i-K2J3SNb-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-Lp5JJM7/0/b7ac92a8/S/i-Lp5JJM7-S.jpg', // Morrison
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-Lp5JJM7/0/b7ac92a8/S/i-Lp5JJM7-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-R3BwWtn/0/0176ffd2/S/i-R3BwWtn-S.jpg', // Joplin
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-R3BwWtn/0/0176ffd2/S/i-R3BwWtn-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-srMgzN5/0/3b467a1e/S/i-srMgzN5-S.jpg', // Mercury
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-srMgzN5/0/3b467a1e/S/i-srMgzN5-S.jpg',
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-QWJrKjK/0/c2a92502/S/i-QWJrKjK-S.jpg',  // Marley
    'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-QWJrKjK/0/c2a92502/S/i-QWJrKjK-S.jpg'
];

// Let's get started:
resetGame();


// Just shuffle the array of images
// Cribbed from Stack:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    } 
}

function turnCard(id) {
    score++;
    scoreElement.innerText = score;
    
    // Let's not let the player re-click the same card over and over
    // so wipe the onclick event:
    document.getElementById(id).onclick = '';

    // Show the image:
    document.getElementById(id).src = cards[id];
    

    
    if (pick1) {
        // We already have pick1, so this has to be pick2:
        pick2 = id;

        // Check if the two selections are a match:
        if (cards[pick1] === cards[pick2]){

            // Subtract number of matches left:
            numberRemaining--;

            // Check if it's the end of the game:
            if (numberRemaining == 0) {

                numSecondsPlayed = Date.now() - timeStarted / 1000;

                // Right now let keep the responses simple....maybe add some different
                // responses later based on timing....
                if (score == 24){
                    updateFeedback("You're either psycic or cheating?");
                }
                else if (numSecondsPlayed < 60) {
                    updateFeedback("HOT DAMN!  You finished in less than a minute!");
                }
                else if (score >= 70) {
                    updateFeedback(getSnark(win_bad),40);
                }
                else if (score < 50) {
                    updateFeedback(getSnark(win_good),40);
                }
                else if (score >= 50 && score <= 70) {
                    updateFeedback(getSnark(win_average),40);
                }

            }
            else {
                
                // Keep this around for quick test:
                // updateFeedback("This is the Dory Test");

                if (score == 2){
                    updateFeedback("Don't get too excited, that was just dumb luck.", 10);
                }
                else if (score === 4 && numberRemaining === 10) {
                    updateFeedback("WOW - that's some crazy luck!!!", 30);
                }

                // Let's occationally give some artist specific feedback:
                if (Date.now() - lastFeed >= 6000) {
                    updateFeedback(artistFeedback(cards[pick1]));
                }
                
            }

        }
        else {
            
            if (Date.now() - lastFeed >= 6000) {
                if (score > 60){
                    updateFeedback(getSnark(snark_level2));
                }
                else if (score > 30 && numberRemaining > 8){
                    updateFeedback(getSnark(snark_level2));
                }
                else if (score > 15){
                    updateFeedback(getSnark(snark_level1));
                }
                else {
                    updateFeedback(getSnark(snark_missed));
                }                
                
            }

            // Check if we've changed the card back...if we have,
            // now let's set it back to the original card back
            if (isDoryMode){
                const hasNemoBack = /i-2H2N59S-M/;
                setTimeout(function(){
                    for (let i = 0; i < 24; i++){
                        let cb = document.getElementById(i).src;
                        if (hasNemoBack.test(cb)){
                            document.getElementById(i).src = 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-jRWPfbz/0/0bf7842a/M/i-jRWPfbz-M.jpg';
                        }
                    }
                }, 500);
            }

            // Reset selections after 2 seconds:
            // Note - you have to add the function there itself...
            //        not call a function which executes imemediately 
            setTimeout(function (pid1,pid2) {
                // Turn the two cards back over....
                document.getElementById(pid1).src = "https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-jRWPfbz/0/0bf7842a/M/i-jRWPfbz-M.jpg";
                document.getElementById(pid2).src = "https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-jRWPfbz/0/0bf7842a/M/i-jRWPfbz-M.jpg";

                // Plug the onclick event back in....
                document.getElementById(pid1).onclick = function () {turnCard(pid1);};
                document.getElementById(pid2).onclick = function () {turnCard(pid2);};

            }, 2000, pick1, pick2);

        }

        pick1 = null;
        pick2 = null;
    }
    else {
        // We don't already have pick 1, so this has to be in
        // Store the id in pick1 and let the player make their
        // second pick
        pick1 = id;

        // Maybe eventually add pre-second pick snark here

    }

}


playButton.addEventListener("click", function () {
    resetGame();

    // hide all the cards
    for (let i = 0; i < 24; i++){
        document.getElementById(i).src = "https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-jRWPfbz/0/0bf7842a/M/i-jRWPfbz-M.jpg";
    }
    
});

function changeCardBacks(img) {
    const hasOriginalCardBack = /i-jRWPfbz-M/;

    setTimeout(function(){
        for (let i = 0; i < 24; i++){
            let cb = document.getElementById(i).src;
            if (hasOriginalCardBack.test(cb)){
                document.getElementById(i).src = img;
            }
        }
    }, 500);

}

function resetGame(){
    timeStarted = Date.now();
    score = 0;
    scoreElement.innerText = score;

    numberRemaining = 12;
    
    updateFeedback("Hmmmm, let's see how good of a memory you have....  Don't let me distract you.");
    
    // I think javascript doesn't like me using zero in the for loop
    // below to populate the onclick events to the card elements....
    // Do the first card (zero) by itself, then populate the rest via
    // the for loop below
    document.getElementById(0).onclick = function() {turnCard('0');};
    
    // Need to re-add the event 
    for (let i = 1; i <= 23; i++){
        document.getElementById(i).onclick = function () {turnCard(i);};
    }
    
    // Initial Shuffle:
    shuffleArray(cards);
}

function updateFeedback(str, speed=20){
    
    feed.innerText = "";

    var i = 0;

    typeIt();

    function typeIt() {
        if (i < str.length){
            feed.innerHTML += str.charAt(i);
            i++;
            setTimeout(typeIt, speed);
        }
    }

    lastFeed = Date.now();


    if (hasDory.test(str)){
        changeCardBacks('https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-2H2N59S/0/3ba5bf72/M/i-2H2N59S-M.jpg');
        isDoryMode = true;
    }
    
}


// Grab a random comment from the artist the player just matched:
function artistFeedback (jpg){
    let arr = [];

    // Ohhh cool, javascript has a case statement!
    switch (jpg){
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-mqZc3XH/0/90489af5/S/i-mqZc3XH-S.jpg': arr = bennington; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-NwFxvMh/0/2e2242ed/S/i-NwFxvMh-S.jpg': arr = cornell; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-6mrsZw7/0/022a7c41/S/i-6mrsZw7-S.jpg': arr = cobain; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-JL9n7g9/0/b46956da/S/i-JL9n7g9-S.jpg': arr = vaughan; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-sQcH6vZ/0/65d22bbc/S/i-sQcH6vZ-S.jpg': arr = weiland; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-SSx4VTN/0/016743f0/S/i-SSx4VTN-S.jpg': arr = staley; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-WHDTVHD/0/a9cd2b85/S/i-WHDTVHD-S.jpg': arr = lennon; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-K2J3SNb/0/dbf26ae9/S/i-K2J3SNb-S.jpg': arr = hendrix; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-Lp5JJM7/0/b7ac92a8/S/i-Lp5JJM7-S.jpg': arr = morrison; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-R3BwWtn/0/0176ffd2/S/i-R3BwWtn-S.jpg': arr = joplin; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-srMgzN5/0/3b467a1e/S/i-srMgzN5-S.jpg': arr = mercury; break;
        case 'https://photos.smugmug.com/Siteimages/Memorygame/Images/n-54KHMf/i-QWJrKjK/0/c2a92502/S/i-QWJrKjK-S.jpg': arr = marley; break;
    }

    // pluck a random item from the array and return it!
    return arr[Math.floor(Math.random()*arr.length)];
}


function getSnark(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

// Snark, trivia, quotes, odd ball comments etc....
let win_average = [
    "Done.  But you only did okay.",
    "Wait, did you win?  I wasn't paying attention.",
    "You are incredibly average.",
    "You win...and you didn't completely suck.  Good job.",
    "You're the Diet Coke of Concentration players",
    "Watching that was about exciting as watching paint dry",
    "Finally done...",
    "I was starting to doubt you'd ever get that done.",
    "That was the Toyota Corolla of games....  Yawn.",
    "Like one music critic wrote review of Bohemian Rhapsody:  'This was perfectly adequate.'"
];

let win_good = [
    "WINNER - you are a freak of nature.  Memory is your superpower...well done Captain Super-Brains!",
    "I'd really like to criticize you, but you did dang good!",
    "You are the Joe Montana of Concentration!",
    "VICTORY!!!",
    "Super awesome round!",
    "I'll have to try to distract you a little harder next time."
];

let win_bad = [
    "I expected you to be better than that.",
    "There's 5 minutes of my life I'll never get back.",
    "That was sad.  Maybe try visiting https://blog.iqmatrix.com/improve-your-memory",
    "That was really good......for someone with alzheimer's",
    "That took long enough.",
    "I'd say keep trying and you'll get better, but hell, you'd have to go out of your way to try to do that bad again.",
    "Oh you won....  Sorry, I stopped paying attention ages ago",
    "Fact:  Stevie Wonder had a better score than that.",
    "You're like the guy from Momento - maybe you need to start tatooing things on your arms to rememeber them.",
    "My condolences - you're clearly suffering from some sort of brain trauma."
];

let snark_missed = [
    "Wrongo!",
    "Oh c'mon!  You must have seen that card like 3 or 4 times now!",
    "Surely you can do better...",
    "Ha - you were way off!",
    "You not so good.",
    "Maybe try harder?",
    "I'm not distracting you up here am I???",
    "I'm pretty sure you just saw that one....",
    "Oh you were soooo close!",
    "Ouch, not even close mate!",
    "Ha - I knew you were going to get that one wrong!",
    "Are you looking at the cards after you click them???"
];

let snark_level1 = [
    "You're not very good...",
    "Oh, maybe you don't know how to play....  You click on the card, you remember where it is so when you find it's match you click on it again.",
    "Lots of cards left....",
    "Pro tip...  try remembering which cards you already clicked.",
    "Are you even trying?",
    "As much as I enjoy making fun of you, I must admit, I don't have a very good memory.  It's much better than yours though.",
    "Tic toc tic toc tic toc....",
    "You're kind of floundering about.",
    "Did you suffer some sort of brain trauma?",
    "Darn....you were SOOOO close.  Wait, sorry, no, you were way off, hahahaha!",
    "Are you getting adequate sleep....?  Your memory is rather poor.",
    "Maybe you should try the 'Memory Palace' technique...",
    "I hear there's a memory technique called 'chunking', which sounds like it's the dance that the chubby kid does in Goonies",
    "I'm getting sleepy watching you.",
    "Memory 'champion' Dom O'Brien was able to memorize 54 decks of cards in sequence looking at each card only once by using the 'Memory Palace' technique!",
    "I'm much better than you are at this...",
    "I was just going to say something, but I can't remember what it was....  Based on how you're doing so far, I'm guessing that happens to you all the time!",
    "Epic yawn fest....c'mon , pick it up.",
    "Based on your card selections and speed, I can say with 50% certainty you're a female."
];

let snark_level2 = [
    "Maybe you'd be better at something like knitting?",
    "Hmmmmmm, maybe try something that doesn't require so much brain power?  Like couchpotatoing?  Can I make a verb out of that?",
    "Please, try harder would you....this is getting embarrassing.",
    "I'm going to go for a walk....I'm sure you'll still be working on this when I come back.",
    "Ummmm, maybe you should just start over...?",
    "Might want to consider hitting that play button up there to just start over!",
    "Am I being punk'd?  You can't really be this bad can you?",
    "Okay, this is getting painful to watch.",
    "I'm pretty sure a trained chimp could probably do better than this.",
    "Would you like to buy a life line...?",
    "It's a popular belief that people only use 10% of their brain.  I think in your case it might be closer to 2%.",
    "Please stop!  Just delete me....  find the server I'm living on and burn it to the ground, watching you is killing me.",
    "I'd offer to help, but I think it's a little late for that.",
    "Wake me up when you finish....which at this rate might be tomorrow.    If we're lucky.",
    "I can't watch anymore, I just damaged my eyes from rolling them too much.",
    "Maybe you should find a memory game with less cards.",
    "Have you been tested for alzheimer's???",
    "You're like Dory from Finding Nemo!  Hahaha...  Sometimes I crack myself up!"
];

let praise = [
    "Wow, you're really good....are you cheating?",
    "Very well done!",
    "I tip my hat to you - right on!",
    "I think you discovered your super power - you've got good memory.",
    "Wow, you must be psycic or something!",
    "I'm clearly not distracting you...",
    "You're going to be done quick if you keep this pace up.",
    "Would you be willing to pick my lottery numbers for me???",
    "Are you taking notes or something?  You're good!",
    "Hmmm - you have a photographic memory?"
];

let cobain = [
    "'With Kurt Cobain you felt you were connecting to the real person, not to a perception of who he was.' - Lars Ulrich",
    "Cobain identified as being bi-sexual and was LGBT rights advocate.",
    "I remember the first time I heard Teen Spirit by Nirvana, I wasn't entirely sure Cobain was using real words.",
    "The smiley-face design on the cards below was drawn by Kurt Cobain for the band’s Nevermind release party in 1991",
    "I was inspired to use the smiley-face for the cards below while watching the SYFY show Van Helsing where one character always wears a Nirvana smiley-face t-shirt.",
    "Kurt Cobain never struck me as someone who would own a shotgun.  You never can tell can you.",
    "Kurt Cobain's suicide note mentions how he admired and envied the way Freddie Mercury 'seemed to love, relish in the love and adoration from the crowd'."
];

let marley = [
    "Bob Marley died of skin cancer...",
    "Cancer really sucks man.",
    "Bob Marley survived an assinsation attempt by 3 armed men at his home, only to die of cancer 5 years later.",
    "'Free speech carries with it some freedom to listen.' - Bob Marley",
    "\"If you’re white and you’re wrong, then you’re wrong; if you’re black and you’re wrong, you’re wrong. People are people.\" - Bob Marley",
    "\“I only have one thing I really like to see happen. I like to see mankind live together – black, white, Chinese, everyone – that’s all.\” Me too Bob...me too.",
    "\"The people who were trying to make this world worse are not taking the day off. Why should I?\" - Bob Marley, speaking truth...",
    "When doctors discovered the cancer, Bob Marley was advised to have his toe amputated, but refused as his Rastafarian faith considers it a sin to have a part of the body ‘temple’ removed."
];

let joplin = [
    "\"Don't compromise yourself. You are all you've got.\" - Words of wisdom from Janis Joplin",
    "'On stage, I make love to 25,000 different people, then I go home alone.', Janis Joplin",
    "Former Dallas Cowboys Head Coach, Jimmy Johnson, was a high school classmate of Joplin.... I don't think she would approve of his hair.",
    "In 1963, Joplin was arrested in San Francisco for shoplifting.",
    "Vogue magazine: 'she slinks like tar, scowls like war, clutching the knees of a final stanza, begging it not to leave... Joplin can sing the chic off any listener.",
    "Janis Joplin appeared at Woodstock starting at approximately 2:00 a.m., on Sunday, August 17, 1969"
];

let mercury = [
    "Freddie Mercury's birth name was Farrokh Bulsara - 'Farrokh' is much cooler than 'Freddie'...not sure what he was thinking there",
    "He was born with four supernumerary incisors, to which he attributed his enhanced vocal range.",
    "Mercury chose the name 'Queen' and later said, \"It's very regal obviously, and it sounds splendid. It's a strong name, very universal and immediate.\"",
    "A study in 2016 trying to understand the appeal behind Mercury's voice noted his faster vibrato and use of subharmonics as unique characteristics of his voice.",
    "Mercury was referenced in Kurt Cobain's suicide note.",
    "Elizabeth Taylor spoke of Mercury as 'An extraordinary rock star who rushed across our cultural landscape like a comet shooting across the sky'.",
    "Freddie Mercury was the first major rock star to die of AIDS",
    "After Mercury's death, Queen's remaining members founded 'Mercury Phoenix Trust' which has since raised millions of pounds for various AIDS charities.",
    "Rami Malek recently won an Oscar for portraying Mercury in 'Bohemian Rhapsody'",
    "I chose this 'dead musicians' theme while watching Bohemian Rhapsody and feeling kind of bad that I sort of forgot about Freddie Mercury over the years.",
    "The Bulsara (Mercury's original surname) family gets its name from Bulsar, a city and district that is now officially known as Valsad. ",
    "Freddie Mercury REALLY loved cats!  He was the crazy cat lady of musicians."
];

let morrison = [
    "Morrison died unexpectedly at the age of 27 in Paris. As no autopsy was performed, the cause of Morrison's death remains unknown.",
    "Morrison was influenced by Friedrich Nietzsche, whose views on aesthetics, morality, and the Apollonian and Dionysian duality would appear in his poetry and songs.",
    "When Morrison was sober, he was a erudite, balanced, friendly kind of guy ... He was Mr. America. When he would drink, he would turn into a maniac.",
    "Another member of the 27 club.",
    "Morrison was buried in Père Lachaise Cemetery in Paris.  I've been to Paris...it was alright.",
    "Not sure about you....but I think Morrison looks a bit like Walton Goggins - you know, from Justified.",
    "When he was 4 he witnessed an accident that influnenced many of his poems and songs",
    "Miko, Oscar, Tiffany, Romeo, Lily, Goliath, Tom, Jerry and Delilah are just a few of the many cats Freddie Mercury had.",
    "When touring, Mercury would frequently call home and he would talk to each of his cats",
    "In Queen's last album, Mercury dedicated and a named a song to Delilah who stole his heart.  Delilah was a tabby he adopted in 1987."
];

let hendrix = [
    "When Hendrix mother died; his father refused to bring him to the funeral and instead gave him and his brother shots of whiskey and told them that's how men deal with loss.",
    "Hendrix is an unfortunate member of the 27 Club - a group consisting mostly of popular musicians that died at the age of 27.",
    "Interesting fact, Jimi Hendrix was good at playing the guitar!",
    "Jimi Hendrix didn't get his first guitar until he was 15 years old.",
    "Hendrix first instrument was a ukilale with one string.  Learning by ear, he played single notes, following along to Elvis Presley songs",
    "'When the power of love overcomes the love of power the world will know peace.'- Jimi Hendrix",
    "The Jimi Hendrix Experience was the last band to perform at Woodstock in 1969",
    "While in the army, Hendrix obsession with his guitar contributed to his neglect of his duties, which led to taunting and physical abuse from his peers, who at least once hid the guitar from him until he had begged for its return.",
    "Hendrix platoon sergeant wrote: 'He has no interest whatsoever in the Army ... It is my opinion that Private Hendrix will never come up to the standards required of a soldier.'",
    "'He (Hendrix) played just about every style you could think of, and not in a flashy way. I mean he did a few of his tricks, like playing with his teeth and behind his back, but it wasn't in an upstaging sense at all, and that was it ... He walked off, and my life was never the same again' - Eric Clapton",
    "Hendrix described his music as 'Free Feeling. It's a mixture of rock, freak-out, rave and blues'.",
    "Jimi Hendrix was born in Seattle"
];
let weiland = [
    "Weiland was a Notre Dame Fighting Irish football fan", 
    "After being arrested for buying crack, Weiland moved into a hotel room next door to Courtney Love for months, where she said he 'shot drugs the whole time' with her.",
    "Weiland died from an accidental overdose of cocaine, ethanol, and methylenedioxyamphetamine....  Who the hell came up with the name 'methylenedioxyamphetamine'?",
    "Weiland met bassist Robert DeLeo. The two of them were discussing their love interests, when they realized one of them was the same girl they were both dating.",
    "Weiland and his band mates chose the name 'Stone Temple Pilots' because they liked the initials 'STP'.",
    "In 2013, Stone Temple Pilots kicked Weiland out of the band and replaced him with another singer who appears on these cards:  Chester Bennington",
    "\"...we are most devastated that he chose to give up. Let's choose to make this the first time we don't glorify this tragedy with talk of rock and roll and the demons that, by the way, don't have to come with it.\" - Weiland's ex-wife Mary Forsberg"
];
let lennon = [
    "Lennon autographed a copy of Double Fantasy for Mark David Chapman, who later that evening shot and killed him. What a dick. Mark David Chapman...not Lennon.",
    "'But what is leading us when we went round in circles?' - Lennon on bandmate Paul McCartney 'leading' the Beatles.",
    "John Lennon was shot in the back four times.  Not so sure why the US is so giddy over their 'right to bear arms'.",
    "One of Staley's influences was a band name Anthrax.  Interesting fact - I skipped my prom to see Anthrax in concert!"
];
let vaughan = [
    "Stevie Ray had a dream that he died the day before he died in a helicopter crash...freaky.",
    "For his seventh birthday, Vaughan received his first guitar, a toy from Sears.",
    "Stevie Ray Vaughan was only five feet, five inches tall",
    "Vaughan is still regarded as one of the best guitar players of all time",
    "Vaughan was supposed to be on a different helicopter with his brother, but serveral of Eric Clapton's crew already taken seats in that helicopter so he boarded the one that ultimately crashed.",
    "Vaughan's first studio recording was with the band 'Cast of Thousands', which included actor Stephen Tobolwsky....aka Ned Ryerson from Groundhog day.",
    "After growing tired of the Dallas music scene, Vaughan dropped out of school and moved with his band to Austin, Texas, which had more liberal and tolerant audiences."
];
let staley = [
    "Kurt Cobain's death in April 1994 scared Staley into temporary sobriety, but soon he was back into his addiction.",
    "Although it sounds like a stage name, Layne Staley's actual name really is Layne Staley... (my wife disagrees with me on this and thinks his name sounds completely normal)",
    "I think we can all agree:  Depression + drugs === !good",
    "Staley began playing drums at age 12",
    "'Drugs worked for me for years, now they're turning against me and I'm walking through hell and it sucks.  I didn't want my fans to think heroin was cool' - Layne Staley on his struggle with drugs."
];
let cornell = [
    "Chris Cornell's original name was Christopher John Boyle.",
    "During his teenage years, Chris spiralled in to severe depression and dropped out of school.",
    "'With a religion like Catholicism, it's not designed for anyone to question.' - Cornell",
    "Cornell was originally on drums and vocals for Soundgarden."
];
let bennington = [
    "Bennington was good friends with Chris Cornell who also hung himself.",
    "Chester was awesome on Carpool Karaoke - look it up, he was hilarious with Ken Jeong",
    "Chester Bennington is the only one on these cards that I've seen in concert.",
    "Chester was a huge Madonna fan and credits her with growing up wanting to be a musician.",
    "Linkin Park is my favorite band."
];
