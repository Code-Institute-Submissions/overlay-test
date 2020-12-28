const buildBtn = document.addEventListener("DOMContentLoaded", buildButtons);

const testBox = document.getElementById("test-box")
const words = ["is", "look", "come", "see", "play", "cat", "dog", "when", "up", "at", "when", "and", "eat", "the", "my", "for", "to", "you" ];
const totalWords = 300;
const colors = [
     {
       'name': 'No Overlay',
        'colorValue': 'rgba(0,0,0,0.01)'
     },
     {
       'name': 'Mint Green',
        'colorValue': 'rgba(62,239,118,0.3)'
     },
     {
       'name': 'Lime Green',
        'colorValue': 'rgba(25,245,0,0.3)'
     },
     {
       'name': 'Rose',
        'colorValue': 'rgba(218,106,152,0.3)'
     },
     {
       'name': 'Pink',
        'colorValue': 'rgba(245,0,168,0.3)'
     },
     {
       'name': 'Purple',
        'colorValue': 'rgba(61,6,109,0.3)'
     },
     {
       'name': 'Yellow',
        'colorValue': 'rgba(219,235,9,0.3)'
     },
     {
       'name': 'Blue',
        'colorValue': 'rgba(9,46,235,0.3)'
     },
    { 
        'name' : 'Aqua',
        'colorValue' : 'rgba(64,177,168,0.3)' 
    },
    { 
        'name' : 'Orange',
        'colorValue' : 'rgba(260,200,30,0.3)' 
    },
    { 
        'name' : 'Grey',
        'colorValue' : 'rgba(0,0,0,0.3)'
    }
];

function buildButtons() {
    
    for(i = 0; i < colors.length; i++) {
        let button = document.createElement("button");
        let addColor = colors[i].colorValue; 
        
        button.innerHTML = colors[i].name;
        button.className = "overlay-btns";
        button.addEventListener("click", function() {
            let overlay = document.getElementById("overlay-effect")
            overlay.style.backgroundColor = addColor; 
            
        });

        let buttonDiv = document.getElementById("btns");
        buttonDiv.appendChild(button);
    }
}

function startTest() {
    testBox.innerHTML = "";

    findPara()
    startTimer()
}

function findWord() {
    let word = words[Math.floor(Math.random()*words.length)]
    word = (word + " ");
    return word;
} 

function findPara () {
    let para = "";
    
    for(let i = 0; i < totalWords; i++) {
        let thisWord= findWord();    
        let str = `<span class = "wordings" data-word-number=${i} onclick = "test(this.getAttribute('data-word-number'))">${thisWord}</span>`;
        let findEndStr =  para.slice(-12);
        let missWord = findEndStr.includes(thisWord);
        
        if (missWord == true ) {
                continue;        
            } else {
                para += str;        
            }
        }
    testBox.innerHTML = para;

    return testBox;    
}


function startTimer() {
    setTimeout(stopTest, 30000)
}

function stopTest() {
    alert ("TIMES UP! Click the last word you read!");    
}

function test(data_word_number) {    
    data_word_number++
    alert( "WELL SOMEONE HAS BEEN CHECKING OUT MY GITHUB..... Looking at you Tony. " + "You read..." + data_word_number + " words!")
    }        


function getResults() {

}

function compareResults() {

}
 
function writeResult() {

}

function resultsAdvice() {

}