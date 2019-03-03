
let score = 0;
let numberRemaining = 0;
let timeStarted = 0;
let numSecondsPlayed = 0;
let lastFeed = 0;
let isDoryMode = false;
const hasDory = /Dory/;

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

let scoreElement = document.getElementById("score");
let playButton = document.getElementById("play");
let feed = document.getElementById("feedback");

let lastMatch = '';

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
    scoreElement.innerText = score;
    
    // Need to figure out best way to prevent re-clicking same element!
    document.getElementById(id).onclick = '';

    // Show the image...
    document.getElementById(id).src = cards[id];
    

    if (pick1) {
        // We already have pick1, so this has to be pick2:
        pick2 = id;

        // Check if pick1 == pick2
        if (cards[pick1] === cards[pick2]){

            // Subtract number of matches left:
            numberRemaining--;

            // Check if it's the end of the game:
            if (numberRemaining == 0) {

                numSecondsPlayed = Date.now() - timeStarted / 1000;


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
                updateFeedback("This is the Dory Test");

                if (score == 2){
                    updateFeedback("Don't get too excited, that was just dumb luck.", 10);
                }
                else if (score === 4 && numberRemaining === 10) {
                    updateFeedback("WOW - that's some crazy luck!!!", 30);
                }

                if (Date.now() - lastFeed >= 7000) {
                    updateFeedback(artistFeedback(cards[pick1]));
                }
                
            }

        }
        else {
            
            if (Date.now() - lastFeed >= 8000) {
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
        pick1 = id;
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
    console.log("IMG: " + img);

    setTimeout(function(){
        for (let i = 0; i < 24; i++){
            let cb = document.getElementById(i).src;
            console.log("CB: " + cb);
            if (hasOriginalCardBack.test(cb)){
                document.getElementById(i).src = img;
            }
        }
    }, 500);

}

function resetGame(){
    timeStarted = Date.now();
    score = 0;
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


// Grab some random artist comment
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


let win_average = [
    "Done.  But you only did okay.",
    "You are incredibly average.",
    "You win...and you didn't completely suck.  Good job.",
    "You're the Diet Coke of Concentration players",
    "Watching that was about exciting as watching paint dry",
    "Finally done...",
    "That was the Toyota Corolla of games....  Yawn.",
    "Like one music critic wrote review of Bohemian Rhapsody:  'This was perfectly adequate.'"
];

let win_good = [
    "WINNER - you are a freak of nature.  Memory is your superpower...well done Captain Super-Brains!",
    "I'd really like to criticize you, but you did dang good!",
    "You are the Joe Montana of Concentration!",
    "Okay - you're good enough to try a second time."
];

let win_bad = [
    "Please....just go.",
    "That was sad.  Maybe try visiting https://blog.iqmatrix.com/improve-your-memory",
    "That was really good......for someone with alzheimer's",
    "That took long enough.",
    "Fact:  Stevie Wonder had a better score than that.",
    "You're like the guy from Momento - maybe you need to start tatooing things on your arms to rememeber them."
];

let snark_missed = [
    "Wrongo!",
    "Oh c'mon!  You must have seen that card like 3 or 4 times now!",
    "Surely you can do better...",
    "Ha - you were way off!",
    "You not so good.",
    "Maybe try harder?",
    "That was bad...",
    "This is getting as crazy as a box of frogs.      Yeah, I don't know what that means either.",
    "Are you looking at the cards after you click them???"
];

let snark_level1 = [
    "You're not very good...",
    "Lots of cards left....",
    "Pro tip...  try remembering which cards you already clicked.",
    "Are you even trying?",
    "I'm getting sleepy watching you.",
    "Epic yawn fest....c'mon , pick it up.",
    "Based on your card selections and speed, I can say with 50% certainty you're a female."
];

let snark_level2 = [
    "Maybe you'd be better at something like knitting?",
    "Please, try harder would you....this is getting embarrassing.",
    "Ummmm, maybe you should just start over...?",
    "Okay, this is getting painful to watch.",
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
    "Would you be willing to pick my lottery numbers for me???",
    "Are you taking notes or something?  You're good!",
    "Hmmm - you have a photographic memory?"
];

let cobain = [
    "'With Kurt Cobain you felt you were connecting to the real person, not to a perception of who he was.' - Lars Ulrich",
    "Cobain identified as being bi-sexual and was LGBT rights advocate.",
    "Kurt Cobain never struck me as someone who would own a shotgun.  You never can tell can you.",
    "Kurt Cobain's suicide note mentions how he admired and envied the way Freddie Mercury 'seemed to love, relish in the love and adoration from the crowd'."
];

let marley = [
    "Bob Marley died of skin cancer...",
    "Cancer really sucks man.",
    "Bob Marley survived an assinsation attempt, only to die of cancer 5 years later.",
    "'Free speech carries with it some freedom to listen.' - Bob Marley",
    "\"If you’re white and you’re wrong, then you’re wrong; if you’re black and you’re wrong, you’re wrong. People are people.\" - Bob Marley",
    "\“I only have one thing I really like to see happen. I like to see mankind live together – black, white, Chinese, everyone – that’s all.\” Me too Bob...me too.",
    "\"The people who were trying to make this world worse are not taking the day off. Why should I?\" - Bob Marley, speaking truth...",
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
    "The Bulsara (Mercury's original surname) family gets its name from Bulsar, a city and district that is now officially known as Valsad. "
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
    "When Hendrix mother died; his father refused to bring him to the funeral and instead gave him shots of whiskey.",
    "Part of the 27 Club - a group consisting mostly of popular musicians that died of the age of 27.",
    "Interesting fact, Jimi Hendrix was good at playing the guitar!",
    "Jimi Hendrix didn't get his first guitar until he was 15 years old.",
    "Hendrix first instrument was a ukilale with one string.",
    "'When the power of love overcomes the love of power the world will know peace.', Jimi Hendrix",
    "The Jimi Hendrix Experience was the last band to perform at Woodstock in 1969"
];
let weiland = [
    "Weiland was a Notre Dame Fighting Irish football fan", 
    "After being arrested for buying crack, Weiland moved into a hotel room next door to Courtney Love for months, where she said he 'shot drugs the whole time' with her.",
    "Drugs are bad.",
    "Died from an accidental overdose of cocaine, ethanol, and methylenedioxyamphetamine....  Who the hell came up with the name 'methylenedioxyamphetamine'?",
    "Weiland met bassist Robert DeLeo. The two of them were discussing their love interests, when they realized one of them was the same girl they were both dating.",
    "They named their band 'Stone Temple Pilots' because they liked the initials 'STP'."
];
let lennon = [
    "Lennon autographed a copy of Double Fantasy for Mark David Chapman, who later that evening shot and killed him. What a dick. Mark David Chapman...not Lennon.",
    "'But what is leading us when we went round in circles?' - Lennon on bandmate Paul McCartney 'leading' the Beatles.",
    "John Lennon was shot in the back four times.  Not so sure why the US is so giddy over their 'right to bear arms'."
];
let vaughan = [
    "Stevie Ray had a dream that he died the day before he died in a helicopter crash...freaky.",
    "For his seventh birthday, Vaughan received his first guitar, a toy from Sears."
];
let staley = [
    "Kurt Cobain's death in April 1994 scared Staley into temporary sobriety, but soon he was back into his addiction.",
    "Layne Staley's actual name really is Layne Staley....     Go figure",
    "Depression + drugs === !good",
    "Staley began playing drums at age 12"
];
let cornell = [
    "Chris Cornell's original name was Christopher John Boyle.",
    "During his teenage years, Chris spiralled in to severe depression, dropped out of school.",
    "'With a religion like Catholicism, it's not designed for anyone to question.' - Cornell",
    "Cornell was originally on drums and vocals for Soundgarden."
];
let bennington = [
    "Bennington was good friends with Chris Cornell who also hung himself.",
    "Chester was awesome on Carpool Karaoke",
    "Chester Bennington is the only one on these cards that I've seen in concert.",
    "Chester was a huge Madonna fan and credits her with growing up wanting to be a musician.",
    "Linkin Park is my favorite band."
];
